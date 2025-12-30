import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/market.dart';
import '../providers/market_provider.dart';
import '../providers/auth_provider.dart';

class MarketDetailScreen extends StatefulWidget {
  final Market market;
  const MarketDetailScreen({super.key, required this.market});

  @override
  State<MarketDetailScreen> createState() => _MarketDetailScreenState();
}

class _MarketDetailScreenState extends State<MarketDetailScreen> {
  @override
  Widget build(BuildContext context) {
    final marketProvider = Provider.of<MarketProvider>(context);
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text('Markt #${widget.market.id}')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.market.question, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            if (widget.market.resolved)
              Text(
                'Ergebnis: ${widget.market.winningOutcomeId != null ? widget.market.outcomes.firstWhere((o) => o.id == widget.market.winningOutcomeId).name : '—'}',
                style: const TextStyle(color: Colors.green),
              ),
            const SizedBox(height: 12),
            const Text('Outcomes:', style: TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            ...widget.market.outcomes.map((outcome) => ListTile(
                  title: Text(outcome.name),
                  subtitle: Text('Odds: ${outcome.odds}'),
                  trailing: ElevatedButton(
                    onPressed: widget.market.resolved ? null : () => _showBetDialog(outcome.id, marketProvider, auth),
                    child: const Text('Bet'),
                  ),
                )),
            if (widget.market.resolved) const SizedBox(height: 12),
            if (widget.market.resolved) Text('Resolved. Winner: ${widget.market.winningOutcomeId}'),
          ],
        ),
      ),
    );
  }

  void _showBetDialog(int outcomeId, MarketProvider marketProvider, AuthProvider auth) {
    final TextEditingController controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Wette platzieren'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(labelText: 'Betrag'),
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Abbrechen'),
          ),
          TextButton(
            onPressed: () async {
              final text = controller.text;
              final amount = double.tryParse(text);
              if (amount == null || amount <= 0) {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Bitte gültigen Betrag eingeben')));
                return;
              }
              try {
                await marketProvider.placeBet(widget.market.id, outcomeId, amount, auth);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Wette platziert')));
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Fehler: ${e.toString()}')));
              }
            },
            child: const Text('Platzieren'),
          ),
        ],
      ),
    ).then((_) => controller.dispose());
  }
}
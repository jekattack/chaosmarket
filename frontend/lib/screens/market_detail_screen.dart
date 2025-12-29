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
  int? _selectedOutcomeId;
  final _amountController = TextEditingController();
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    if (widget.market.outcomes.isNotEmpty) {
      _selectedOutcomeId = widget.market.outcomes.first.id;
    }
  }

  @override
  void dispose() {
    _amountController.dispose();
    super.dispose();
  }

  Future<void> _placeBet() async {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final marketProvider = Provider.of<MarketProvider>(context, listen: false);
    final amount = double.tryParse(_amountController.text);
    if (amount == null || amount <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Bitte gültigen Betrag eingeben')));
      return;
    }
    if (_selectedOutcomeId == null) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Bitte Outcome wählen')));
      return;
    }

    setState(() => _loading = true);
    try {
      await marketProvider.placeBet(widget.market.id, _selectedOutcomeId!, amount, auth);
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Wette platziert')));
      Navigator.of(context).pop();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Fehler: ${e.toString()}')));
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.market;
    return Scaffold(
      appBar: AppBar(title: Text('Markt #${m.id}')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(m.question, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            if (m.resolved)
              Text('Ergebnis: ${m.winningOutcomeId != null ? m.outcomes.firstWhere((o) => o.id == m.winningOutcomeId).name : '—'}', style: const TextStyle(color: Colors.green)),
            const SizedBox(height: 12),
            const Text('Outcomes:', style: TextStyle(fontWeight: FontWeight.w600)),
            ...m.outcomes.map((o) => RadioListTile<int>(
                  value: o.id,
                  groupValue: _selectedOutcomeId,
                  title: Text('${o.name} (${o.odds})'),
                  onChanged: (v) => setState(() => _selectedOutcomeId = v),
                )),
            const SizedBox(height: 12),
            TextField(
              controller: _amountController,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(labelText: 'Betrag'),
            ),
            const SizedBox(height: 12),
            _loading
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(onPressed: _placeBet, child: const Text('Wette platzieren')),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/market_provider.dart';
import '../providers/auth_provider.dart';
import '../models/market.dart';

class MarketDetailScreen extends StatefulWidget {
  final Market market;

  const MarketDetailScreen({super.key, required this.market});

  @override
  _MarketDetailScreenState createState() => _MarketDetailScreenState();
}

class _MarketDetailScreenState extends State<MarketDetailScreen> {
  final _amountController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final marketProvider = Provider.of<MarketProvider>(context);
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(title: Text(widget.market.question)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Question: ${widget.market.question}'),
            const SizedBox(height: 20),
            const Text('Outcomes:'),
            ...widget.market.outcomes.map((outcome) => ListTile(
              title: Text(outcome.name),
              subtitle: Text('Odds: ${outcome.odds}'),
              trailing: ElevatedButton(
                onPressed: widget.market.resolved ? null : () => _showBetDialog(outcome.id, marketProvider, auth),
                child: const Text('Bet'),
              ),
            )),
            if (widget.market.resolved) Text('Resolved. Winner: ${widget.market.winningOutcomeId}'),
          ],
        ),
      ),
    );
  }

  void _showBetDialog(int outcomeId, MarketProvider marketProvider, AuthProvider auth) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Place Bet'),
        content: TextField(
          controller: _amountController,
          decoration: const InputDecoration(labelText: 'Amount'),
          keyboardType: TextInputType.number,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              try {
                await marketProvider.placeBet(
                  widget.market.id,
                  outcomeId,
                  double.parse(_amountController.text),
                  auth,
                );
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Bet placed successfully')),
                );
              } catch (e) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(e.toString())),
                );
              }
            },
            child: const Text('Place Bet'),
          ),
        ],
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/market_provider.dart';
import '../providers/auth_provider.dart';

class UserBetsScreen extends StatefulWidget {
  const UserBetsScreen({super.key});

  @override
  State<UserBetsScreen> createState() => _UserBetsScreenState();
}

class _UserBetsScreenState extends State<UserBetsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final auth = Provider.of<AuthProvider>(context, listen: false);
      final marketProvider = Provider.of<MarketProvider>(context, listen: false);
      marketProvider.fetchUserBets(auth);
    });
  }

  @override
  Widget build(BuildContext context) {
    final marketProvider = Provider.of<MarketProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Meine Wetten')),
      body: marketProvider.loading
          ? const Center(child: CircularProgressIndicator())
          : marketProvider.error != null
              ? Center(child: Text('Fehler: ${marketProvider.error}'))
              : marketProvider.userBets.isEmpty
                  ? const Center(child: Text('Keine Wetten vorhanden'))
                  : ListView.builder(
                      itemCount: marketProvider.userBets.length,
                      itemBuilder: (context, idx) {
                        final b = marketProvider.userBets[idx];
                        return ListTile(
                          title: Text(b.market?.question ?? 'Markt #${b.market?.id ?? ''}'),
                          subtitle: Text('Outcome: ${b.outcomeId} — Betrag: ${b.amount}'),
                        );
                      },
                    ),
    );
  }
}

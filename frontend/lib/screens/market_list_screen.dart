import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/market_provider.dart';
import '../models/market.dart';
import 'market_detail_screen.dart';

class MarketListScreen extends StatefulWidget {
  const MarketListScreen({super.key});

  @override
  _MarketListScreenState createState() => _MarketListScreenState();
}

class _MarketListScreenState extends State<MarketListScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final marketProvider = Provider.of<MarketProvider>(context, listen: false);
      final auth = Provider.of<AuthProvider>(context, listen: false);
      marketProvider.fetchMarkets();
      if (auth.isAuthenticated) {
        marketProvider.fetchUserBets(auth);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final marketProvider = Provider.of<MarketProvider>(context);
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Markets'),
        actions: [
          IconButton(
            icon: const Icon(Icons.list_alt),
            tooltip: 'Meine Wetten',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const UserBetsScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => auth.logout(),
          ),
        ],
      ),
      body: marketProvider.loading
          ? const Center(child: CircularProgressIndicator())
          : marketProvider.error != null
              ? Center(child: Text('Fehler: ${marketProvider.error}'))
              : ListView.builder(
                  itemCount: marketProvider.markets.length,
                  itemBuilder: (context, index) {
                    final market = marketProvider.markets[index];
                    return ListTile(
                      title: Text(market.question),
                      subtitle: Text('Outcomes: ${market.outcomes.length}'),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => MarketDetailScreen(market: market),
                          ),
                        );
                      },
                    );
                  },
                ),
    );
  }
}
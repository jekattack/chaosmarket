import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'providers/market_provider.dart';
import 'screens/login_screen.dart';
import 'screens/market_list_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MarketProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ChaosMarket',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomeDecider(),
    );
  }
}

class HomeDecider extends StatefulWidget {
  const HomeDecider({super.key});

  @override
  State<HomeDecider> createState() => _HomeDeciderState();
}

class _HomeDeciderState extends State<HomeDecider> {
  bool _checked = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await Provider.of<AuthProvider>(context, listen: false).tryAutoLogin();
      setState(() => _checked = true);
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    if (!_checked) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return auth.isAuthenticated ? const MarketListScreen() : const LoginScreen();
  }
}
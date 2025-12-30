import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/market.dart';
import '../models/bet.dart';
import 'auth_provider.dart';
import '../config/api_config.dart';

class MarketProvider with ChangeNotifier {
  List<Market> _markets = [];
  List<Bet> _userBets = [];
  bool _loading = false;
  String? _error;

  List<Market> get markets => _markets;
  List<Bet> get userBets => _userBets;
  bool get loading => _loading;
  String? get error => _error;

  Future<void> fetchMarkets() async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      final response = await http.get(Uri.parse('$apiBaseUrl/markets'));
      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List;
        _markets = data.map((json) => Market.fromJson(json)).toList();
      } else {
        _error = 'Failed to load markets (${response.statusCode})';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> placeBet(int marketId, int outcomeId, double amount, AuthProvider auth) async {
    final response = await http.post(
      Uri.parse('$apiBaseUrl/bets'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${auth.token}',
      },
      body: json.encode({
        'marketId': marketId,
        'outcomeId': outcomeId,
        'amount': amount,
      }),
    );

    if (response.statusCode == 201) {
      await fetchUserBets(auth);
      notifyListeners();
    } else {
      final msg = response.body.isNotEmpty ? response.body : 'Failed to place bet';
      throw Exception(msg);
    }
  }

  Future<void> fetchUserBets(AuthProvider auth) async {
    _loading = true;
    _error = null;
    notifyListeners();
    try {
      final response = await http.get(
        Uri.parse('$apiBaseUrl/bets/user'),
        headers: {'Authorization': 'Bearer ${auth.token}'},
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body) as List;
        _userBets = data.map((json) => Bet.fromJson(json)).toList();
      } else {
        _error = 'Failed to load bets (${response.statusCode})';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _loading = false;
      notifyListeners();
    }
  }
}
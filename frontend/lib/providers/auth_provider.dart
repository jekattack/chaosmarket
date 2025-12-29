import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;
  String? _token;

  bool get isAuthenticated => _isAuthenticated;
  String? get token => _token;

  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://localhost:3000/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      _token = data['access_token'];
      _isAuthenticated = true;
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', _token!);
      notifyListeners();
    } else {
      throw Exception('Failed to login');
    }
  }

  Future<void> register(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://localhost:3000/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 201) {
      await login(email, password);
    } else {
      throw Exception('Failed to register');
    }
  }

  Future<void> logout() async {
    _isAuthenticated = false;
    _token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    notifyListeners();
  }

  Future<void> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.containsKey('token')) {
      _token = prefs.getString('token');
      _isAuthenticated = true;
      notifyListeners();
    }
  }
}
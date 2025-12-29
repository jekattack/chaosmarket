class Bet {
  final int id;
  final int marketId;
  final int outcomeId;
  final double amount;
  final double potentialPayout;

  Bet({
    required this.id,
    required this.marketId,
    required this.outcomeId,
    required this.amount,
    required this.potentialPayout,
  });

  factory Bet.fromJson(Map<String, dynamic> json) {
    return Bet(
      id: json['id'],
      marketId: json['marketId'],
      outcomeId: json['outcomeId'],
      amount: json['amount'],
      potentialPayout: json['potentialPayout'],
    );
  }
}
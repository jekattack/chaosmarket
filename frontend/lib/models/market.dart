class Market {
  final int id;
  final String question;
  final List<Outcome> outcomes;
  final bool resolved;
  final int? winningOutcomeId;

  Market({
    required this.id,
    required this.question,
    required this.outcomes,
    required this.resolved,
    this.winningOutcomeId,
  });

  factory Market.fromJson(Map<String, dynamic> json) {
    return Market(
      id: json['id'],
      question: json['question'],
      outcomes: (json['outcomes'] as List).map((o) => Outcome.fromJson(o)).toList(),
      resolved: json['resolved'],
      winningOutcomeId: json['winningOutcomeId'],
    );
  }
}

class Outcome {
  final int id;
  final String name;
  final double odds;

  Outcome({
    required this.id,
    required this.name,
    required this.odds,
  });

  factory Outcome.fromJson(Map<String, dynamic> json) {
    return Outcome(
      id: json['id'],
      name: json['name'],
      odds: json['odds'],
    );
  }
}
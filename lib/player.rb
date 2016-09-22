require_relative 'hand'

class Player
  attr_reader :hand, :deck, :pot

  def initialize(deck,amount)
    @deck = deck
    @pot = amount
    @hand = Hand.new(@deck)
  end
end

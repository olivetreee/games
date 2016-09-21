require_relative 'card'

class Deck
  attr_reader :cards

  def initialize
    @cards = []
    populate_cards
  end

  def deal_cards(qty)
    dealt_cards = []

    qty.times do
      dealt_cards << @cards.pop
    end

    dealt_cards
  end

  private

  def populate_cards
    suits = [:heart, :diamond, :spade, :club]

    suits.each do |suit|
      0.upto(12) do |val|
        @cards << Card.new(val, suit)
      end
    end

    @cards.shuffle!
  end
end

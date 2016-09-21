require 'rspec'
require 'deck'

describe Deck do
  let(:deck){ Deck.new }
  let(:suits) {[:heart, :diamond, :spade, :club]}

  context "#initialize" do
    it "should have 52 cards" do
      expect(deck.cards.length).to eq(52)
      deck.cards.all? do |card|
        expect(card).to be_an_instance_of(Card)
      end
    end

    it "should have 13 cards of each suit" do
      full_deck = suits.all? do |suit|
          suit_count = deck.cards.count {|card| card.suit == suit}
          suit_count == 13
      end

      expect(full_deck).to be true
    end

    it "should shuffle the cards" do
      expect(deck.cards).to_not eq(deck.cards.sort)
    end
  end

  context "#deal_cards" do
    it "should pop and return the specified amount of cards" do
      expect(deck.deal_cards(1).length).to eq(1)
      expect(deck.deal_cards(1)[0]).to be_an_instance_of(Card)
    end

    it "should remove the dealt cards from the deck" do
      deck.deal_cards(1)
      expect(deck.cards.length).to eq(51)
    end

    it "should replace deck with muck cards when deck is exhausted"
  end
end

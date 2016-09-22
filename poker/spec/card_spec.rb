require 'rspec'
require 'card'

describe Card do
  let(:card) {Card.new(0, :heart)}

  context "#initialize" do
    it "initializes with a value and a suit" do
      expect(card.value).to eq("A")
      expect(card.suit).to eq(:heart)
    end

    it "raises an error if it receives bad parameters" do
      expect{Card.new(-1, :heart)}.to raise_error("Invalid value")
      expect{Card.new(5, :apps)}.to raise_error("Invalid suit")
    end
  end

  context "#to_s" do
    it "returns value and suit of the card" do
      expect(card.to_s).to eq("Ace of Hearts")
    end
  end
end

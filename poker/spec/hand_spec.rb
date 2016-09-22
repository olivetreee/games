require 'hand'
require 'rspec'

describe Hand do
  # #<=> should be comparable with other hands

  let(:straight_flush) do
    [
      double("card", :value => "A", :suit => :heart, :numeric_value => 1),
      double("card", :value => "2", :suit => :heart, :numeric_value => 2),
      double("card", :value => "3", :suit => :heart, :numeric_value => 3),
      double("card", :value => "4", :suit => :heart, :numeric_value => 4),
      double("card", :value => "5", :suit => :heart, :numeric_value => 5)
    ]
  end

  let(:full_house) do
    [
      double("card", :value => "A", :suit => :diamond, :numeric_value => 1),
      double("card", :value => "A", :suit => :club, :numeric_value => 1),
      double("card", :value => "A", :suit => :spade, :numeric_value => 1),
      double("card", :value => "4", :suit => :club, :numeric_value => 4),
      double("card", :value => "4", :suit => :diamond, :numeric_value => 4)
    ]
  end

  let(:replacement_cards) do
    [
      double("card", :value => "A", :suit => :diamond, :numeric_value => 1),
      double("card", :value => "2", :suit => :diamond, :numeric_value => 2),
      double("card", :value => "3", :suit => :diamond, :numeric_value => 3)
    ]
  end


  let(:deck){ double("deck")}
  let(:deck2){ double("deck")}
  let(:hand_1){Hand.new(deck)}
  let(:hand_2){Hand.new(deck2)}


  before(:each) do
    allow(deck).to receive(:deal_cards).with(5).and_return(straight_flush)
  end

  context "#initialize" do
    it "should initialize with five cards" do
      expect(hand_1.cards.length).to eq(5)
    end
  end

  context "#discard" do
    it "should still have five cards after discard" do
      allow(deck).to receive(:deal_cards).with(3).and_return(replacement_cards)
      hand_1.discard(1,2,4)
      expect(hand_1.cards.length).to eq(5)
    end

    it "should receive 3 new cards" do
      allow(deck).to receive(:deal_cards).with(3).and_return(replacement_cards)
      hand_1.discard(1,2,4)
      expect(hand_1.cards).to_not eq(straight_flush)
    end
  end

  context "#hand_value" do
    it "should return the numeric value of a straight flush hand" do
      allow(hand_1.cards).to receive(:sort!).and_return(straight_flush)
      expect(hand_1.hand_value).to eq(8_203_673)
    end

    it "should return the numeric value of a two-pair hand" do
      allow(deck2).to receive(:deal_cards).with(5).and_return(full_house)
      allow(hand_2.cards).to receive(:sort!).and_return(full_house)
      expect(hand_2.hand_value).to eq(6_164_851)
    end
  end

  context "#<=>" do
    it "should compare two different hands" do
      allow(hand_1.cards).to receive(:sort!).and_return(straight_flush)
      allow(deck2).to receive(:deal_cards).with(5).and_return(full_house)
      allow(hand_2.cards).to receive(:sort!).and_return(full_house)
      expect(hand_1 <=> hand_2).to eq(1)
    end
  end
end

require 'rspec'
require 'player'

describe Player do
  # discard ask which cards player wants to discount and discards them
  # ask action, get fold, see or raise
  # raise ask player how much, subtract that plus current bet from pot, return
  # see subtract current bet from pot
  let(:deck){double("deck")}
  let(:player){Player.new(deck,100)}
  let(:straight_flush) do
    [
      double("card", :value => "A", :suit => :heart, :numeric_value => 1),
      double("card", :value => "2", :suit => :heart, :numeric_value => 2),
      double("card", :value => "3", :suit => :heart, :numeric_value => 3),
      double("card", :value => "4", :suit => :heart, :numeric_value => 4),
      double("card", :value => "5", :suit => :heart, :numeric_value => 5)
    ]
  end

  before(:each) do
    allow(deck).to receive(:deal_cards).with(5).and_return(straight_flush)
  end

  context "#initialize" do

    it "should receive the deck and set reference to it" do
      expect(player.deck).to be(deck)
    end

    it "should initialize the pot" do
      expect(player.pot).to eq(100)
    end

    it "should initialize the hand" do
      expect(player.hand).to be_an_instance_of(Hand)
    end
  end

  context "#discard" do
    allow(player).to receive(:discard).and_return([0,1])
    expect(player.hand).to receive(:discard).with([0,1])
    player.discard
    #expect player to receive discard and
  end

end

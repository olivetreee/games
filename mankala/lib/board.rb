class Board
  attr_accessor :cups

  def initialize(name1, name2)
    cups_stones = Array.new(6){ Array.new(4,:stone) }
    @cups = cups_stones + Array.new(1,[]) + cups_stones + Array.new(1,[])
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
  end

  def valid_move?(start_pos)
    pos_in_cups_1 = (1..6).cover?(start_pos)
    pos_in_cups_2 = (8..13).cover?(start_pos)
    raise "Invalid starting cup" unless pos_in_cups_1 || pos_in_cups_2
  end

  def make_move(start_pos, current_player_name)
    stones_in_hand = @cups[start_pos]
    @cups[start_pos] = []

    cup_selected = start_pos+1
    until stones_in_hand.empty?
      @cups[cup_selected] << stones_in_hand.pop
      cup_selected += 1
    end

    self.render
  end

  def next_turn(ending_cup_idx)
    # helper method to determine what #make_move returns
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def cups_empty?
  end

  def winner
  end
end

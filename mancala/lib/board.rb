require 'byebug'
class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @player_1_name = name1
    @player_2_name = name2
    @cups = place_stones + Array.new(1,[]) + place_stones + Array.new(1,[])
  end

  def place_stones
    Array.new(6){ Array.new(4,:stone) }
  end

  def valid_move?(start_pos)
    pos_in_cups_1 = (0..5).cover?(start_pos)
    pos_in_cups_2 = (7..12).cover?(start_pos)
    raise "Invalid starting cup" unless pos_in_cups_1 || pos_in_cups_2
    raise "Cup is empty" if @cups[start_pos].empty?
  end

  def make_move(start_pos, current_player_name)

    # self.render
    # byebug
    opponent_point_cup = current_player_name == @player_1_name ? 13 : 6

    stones_in_hand = @cups[start_pos]
    @cups[start_pos] = []

    cup_selected = start_pos
    until stones_in_hand.empty?
      cup_selected += cup_selected == 13 ? -13 : 1
      next if cup_selected == opponent_point_cup
      @cups[cup_selected] << stones_in_hand.pop
    end

    self.render
    self.next_turn(cup_selected,current_player_name)

  end

  def next_turn(ending_cup_idx,current_player_name)
    player_point_cup = current_player_name == @player_1_name ? 6 : 13
    if ending_cup_idx == player_point_cup
      return :prompt
    elsif @cups[ending_cup_idx].length == 1 #was empty before placing the stones
      return :switch
    else
      return ending_cup_idx
    end
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    cups_1_empty = @cups[0..5].all?(&:empty?)
    cups_2_empty = @cups[7..12].all?(&:empty?)
    cups_1_empty || cups_2_empty
  end

  def winner
    player_1_score = @cups[6].count(:stone)
    player_2_score = @cups[13].count(:stone)

    case player_1_score <=> player_2_score
    when -1
      return @player_2_name
    when 0
      return :draw
    when 1
      return @player_1_name
    end
  end
end

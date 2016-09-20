require 'byebug'
require 'colorize'
require_relative 'tile'

class Board

  attr_reader :size
  attr_accessor :cheat

  def initialize(size = 9, difficulty = 2)
    true_array = Array.new(difficulty,true)
    false_array = Array.new(15-difficulty,false)
    difficulty_array = true_array + false_array
    # byebug
    @grid = Array.new(size) do
      Array.new(size) { Tile.new(difficulty_array.sample) }
    end
    @size = size
    @seen_tiles = []
    @cheat = false
  end

  def print_row_number(row)
    print (row) < 10 ? " #{row}" : "#{row}"
  end

  def print_columns_number
   line = ["  "]
   @size.times do |num|
     extra_space = (num) < 10 ? " " : ""
     line << "#{extra_space}#{num}"
   end
   puts line.join("  ")
  end

  def find_neighbors_positions(pos)
    indexs = (-1..1).to_a
    bank = []
    row,col = pos
    indexs.each do |row_increment|
      indexs.each do |col_increment|
        next if row_increment == 0 && col_increment == 0
        tentative_pos = [row + row_increment, col + col_increment]
        bank << tentative_pos if valid_position?(tentative_pos)
      end
    end
    bank
  end

  def valid_position?(pos)
    pos.all? { |n| n.between?(0, @size - 1) }
  end

  def reveal_tile(position)
    @seen_tiles << position
    current_tile = self[position]
    return if current_tile.bomb || current_tile.flag

    neighbors = find_neighbors_positions(position)
    current_tile.value = count_neighbor_bombs(neighbors)
    current_tile.show = true

    return if current_tile.value > 0
    neighbors.each do |neighbor|
      reveal_tile(neighbor) unless @seen_tiles.include?(neighbor)
    end
  end

  def count_neighbor_bombs(neighbors)
    neighbors.count { |position| self[position].bomb }
  end

  def render
    print_columns_number
    @grid.each_with_index do |row,row_num|
      line = [""]
      row.each_index do |column_num|
        position = [row_num,column_num]
        if self[position].show
          line << "#{self[position].value}".green
        elsif self[position].bomb && @cheat
          line << "B".red
        elsif self[position].flag
          line << "F".blue
        else
          line << "_"
        end
      end
      line << ""
      print_row_number(row_num)
      puts line.join(" | ")
    end
  end

  def over?
    unshown_tiles = []
    @grid.length.times do |row_idx|
      @grid[row_idx].each do |tile|
        unshown_tiles << tile if !tile.show
      end
    end
    # unshown_tiles = @grid.select {|tile| !tile.show}
    unshown_tiles.all? {|tile| tile.bomb}
  end

  def [](pos)
    x,y = pos
    @grid[x][y]
  end

  def []= (pos, new_value)
    x,y = pos
    @grid[x][y] = new_value
  end

end

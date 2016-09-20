require 'byebug'
require 'colorize'
require_relative 'board'
require_relative 'cursor'

class Display
  def initialize(board)
    @board = board
    @cursor = Cursor.new([0,0],board)

  end

  def render
    @board.grid.each_with_index do |row,row_num|
      row.each_with_index do |cell,col_num|
        if @cursor.cursor_pos == [row_num,col_num]
          print "| #{cell.name} |".red
        else
          print "| #{cell.name} |"
        end
      end
      puts
    end
  end

  def render_test
    while true
      self.render
      # puts @cursor.cursor_pos
      @cursor.get_input
      system("clear")
    end
  end
end

a = Board.new
# p a.grid.[]([0,0])
d=Display.new(a)
d.render_test
puts "blabla".blue

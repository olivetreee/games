require_relative 'null_piece'
require_relative 'piece'
# require_relative 'display'

class Board
  attr_reader :grid
  def self.initialize_grid
    grid = Array.new(8) {Array.new(8) {nil}}

    # NullPieces
    (2..5).each do |row|
      grid[row].map! {|cell| NullPiece.instance}
    end


    # Regular Pieces
    # Pawns
    grid[1].map!.with_index {|cell,idx| Pawn.new(:pawn,"black",self,[1,idx])}
    grid[6].map!.with_index {|cell,idx| Pawn.new(:pawn,"white",self,[6,idx])}

    [0,7].each do |col|
      self[[0, col]] = Rook.new(:rook, "black", self, [0, col])
    end

    [0,7].each do |col|
      self[[7, col]] = Rook.new(:rook, "white", self, [7, col])
    end

    # (0..0).each do |row|
    #   grid[row].map! {|cell| Piece.new(:king,"white",self,[0,0])}
    # end
    #
    # (7..7).each do |row|
    #   grid[row].map! {|cell| Piece.new(:king,"red",self,[0,0])}
    # end

    # #Uncomment below to fill with NullPieces for testing purposes
    # (0..7).each do |row|
    #   grid[row].map! {|cell| NullPiece.instance}
    # end



    grid
  end

  def initialize
    @grid = self.class.initialize_grid

    # # #Uncomment below to fill with NullPieces for testing purposes
    # @grid[3][3]= Piece.new(:king,"white",self,[3,3])
    # @grid[5][5]= Bishop.new(:bishop,"white",self,[5,5])
  end

  def [](pos)
    x,y = pos
    @grid[x][y]
  end

  def []=(pos,value)
    x,y = pos
    @grid[x][y]=value
  end

  def move(start_pos,end_pos)
    #both have to be inside board
    #start pos has to be a piece
    #end pos has to be no piece
    raise "start position is outside the board" unless is_inside_board?(start_pos)
    raise "end position is outside the board" unless is_inside_board?(end_pos)
    raise "No piece at location" if self[start_pos].is_a?(NullPiece)
    raise "There is already a piece here" unless self[start_pos].is_a?(NullPiece)
  end

  def is_inside_board?(position)
    position.all? { |pos| (0..7).to_a.include?(pos)}
  end

  def is_null_piece?(pos)
    self[pos].is_a?(NullPiece)
  end


end

a = Board.new
# p a.grid.[]([0,0])
# d=Display.new(a)
# d.render

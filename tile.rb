class Tile

attr_reader :bomb

  def initialize(bomb)
    @bomb = bomb
    @flag = false
    @revealed = false
  end


end

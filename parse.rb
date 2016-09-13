require 'json'

songs = []
id = 0
Dir.glob(__dir__+"/songs/*").each do |filename|
  id += 1
  file = File.new(filename, "r")
  song = {:name=>"", :melody=>"", :lyrics=>"", :id=>id}
  song[:name] = file.gets.strip
  song[:melody] = file.gets.strip
  while (line = file.gets)
    if line[0,1] == "{"
      meta = line
      line = file.gets
      while (line[0,1] != "}")
        meta += line
        line = file.gets
      end
      meta += line
      song[:meta] = JSON.parse(meta)
    else
      song[:lyrics] += line
    end
  end
  songs.push(song)
  file.close
end

File.open("songs.json","w") do |f|
  f.write(songs.to_json)
end

desc "run server"
task :server do
  sh "bundle exec jekyll serve --watch"
end

desc "clean"
task :clean do
  rm_rf '_site'
  FileList['**/*.bak'].clear_exclude.each do |f|
    rm_f f
  end
end

desc "build the site"
task :build do
  sh "bundle exec jekyll build"
end

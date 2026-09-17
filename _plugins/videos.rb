=begin
  Builds site.data.videos: a flat list of {section, title, url, date, embed_src, ...}
  combining research.yml videos and teaching.yml project/playlist videos, sorted by
  each video's own `date` (newest first) — not by the parent project's end_date, since
  a project can have multiple videos released at different times.
=end
module Jekyll
  class VideosGenerator < Generator
    priority :low

    def youtube_id(url)
      return nil unless url
      if url.include?('youtu.be/')
        url.split('youtu.be/').last.split('?').first
      elsif url.include?('youtube.com/watch?v=')
        url.split('v=').last.split('&').first
      end
    end

    def youtube_list_id(url)
      return nil unless url && url.include?('list=')
      url.split('list=').last.split('&').first
    end

    def generate(site)
      entries = []

      (site.data.dig('web', 'research') || []).each do |project|
        videos = project.dig('links', 'video')
        next unless videos.is_a?(Array)
        videos.each do |v|
          url = v['url'].to_s.strip
          next if url.empty?
          vid = youtube_id(url)
          next unless vid
          entries << {
            'section'  => 'research',
            'title'    => project['title'],
            'date'     => v['date'].to_s,
            'embed_src' => "https://www.youtube.com/embed/#{vid}",
            'abstract' => project['abstract'],
            'keywords' => project['keywords']
          }
        end
      end

      (site.data.dig('profile', 'teaching') || []).each do |course|
        course_label = "#{course['name']} (#{course['code']})"

        (course['projects'] || []).each do |proj|
          url = proj['url'].to_s.strip
          next unless url.include?('youtu')
          vid = youtube_id(url)
          next unless vid
          entries << {
            'section'      => 'teaching',
            'title'        => proj['title'],
            'date'         => proj['date'].to_s,
            'embed_src'    => "https://www.youtube.com/embed/#{vid}",
            'course_label' => course_label
          }
        end

        playlist = course['video_playlist']
        if playlist.is_a?(Hash)
          list_id = youtube_list_id(playlist['url'].to_s)
          if list_id
            entries << {
              'section'      => 'teaching',
              'title'        => "#{course['name']} — course video playlist",
              'date'         => playlist['date'].to_s,
              'embed_src'    => "https://www.youtube.com/embed/videoseries?list=#{list_id}",
              'course_label' => course_label
            }
          end
        end
      end

      entries.sort_by! { |e| e['date'] }
      entries.reverse!

      site.data['videos'] = entries
    end
  end
end

=begin
  A published post using layout: research_post declares `project_id`, the slugified
  research.yml title the layout looks the project up by. If that lookup fails — a
  research.yml title got edited, or project_id was mistyped — research_post.html
  falls through to `project == nil` and silently drops authors, mentors, dates,
  keywords, buttons and videos while the build stays green.

  This generator checks every published research_post against
  Jekyll::Utils.slugify of each research.yml title (the same helper the layout's
  Liquid `slugify` filter and _plugins/videos.rb both use) and fails the build
  loudly, naming the offending file and project_id, when none match.

  Unpublished stubs (`published: false`) never enter site.posts, so they are never
  checked here — that's the intended half-finished state.
=end
module Jekyll
  class ResearchPostProjectIdCheck < Generator
    priority :low

    def generate(site)
      research = site.data.dig('web', 'research') || []
      known_slugs = research.map { |item| Jekyll::Utils.slugify(item['title'].to_s) }

      site.posts.docs.each do |post|
        next unless post.data['layout'] == 'research_post'

        project_id = post.data['project_id'].to_s
        next if known_slugs.include?(project_id)

        raise "research_post_check: #{post.relative_path} declares project_id " \
              "\"#{project_id}\", which does not match any _data/web/research.yml " \
              "title (slugified). Fix the post's project_id or the research.yml title."
      end
    end
  end
end

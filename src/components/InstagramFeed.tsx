import { Instagram } from "lucide-react";
import { Card } from "@/components/ui/card";

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple/30 rounded-full mb-4">
            <Instagram className="h-5 w-5 text-neon-pink" />
            <span className="text-sm font-medium bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Follow Us on Social Media
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Stay Connected
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow us on Instagram and X for the latest updates, behind-the-scenes content, and tech insights
          </p>
        </div>

        {/* Social Media Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="https://www.instagram.com/kalocode"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
          >
            <Instagram className="h-6 w-6 text-white" />
            <span className="text-white font-semibold">Follow on Instagram</span>
          </a>
          
          <a
            href="https://x.com/odhiambookello5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-black hover:bg-gray-900 rounded-full hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 border border-gray-700"
          >
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-white font-semibold">Follow on X</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Instagram Feed Card */}
          <Card className="bg-card/40 backdrop-blur-sm border-neon-purple/30 p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 mb-2">
                <Instagram className="h-6 w-6 text-neon-pink" />
                <h3 className="text-xl font-bold">Instagram</h3>
              </div>

            {/* Instagram Embed */}
            <div className="w-full max-w-2xl">
              <div className="relative w-full" style={{ paddingBottom: "125%" }}>
                <iframe
                  src="https://www.instagram.com/kalocode/embed"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  title="Instagram Feed"
                ></iframe>
              </div>
            </div>

            {/* Instagram Quick Links */}
            <div className="grid grid-cols-3 gap-3 w-full mt-4">
              <a
                href="https://www.instagram.com/kalocode"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
              >
                <Instagram className="h-6 w-6 text-neon-pink" />
                <span className="text-xs font-semibold">Posts</span>
              </a>
              
              <a
                href="https://www.instagram.com/kalocode/reels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
              >
                <Instagram className="h-6 w-6 text-neon-purple" />
                <span className="text-xs font-semibold">Reels</span>
              </a>
              
              <a
                href="https://www.instagram.com/kalocode/tagged"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
              >
                <Instagram className="h-6 w-6 text-primary" />
                <span className="text-xs font-semibold">Tagged</span>
              </a>
            </div>
          </div>
        </Card>

          {/* X (Twitter) Feed Card */}
          <Card className="bg-card/40 backdrop-blur-sm border-gray-700/30 p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <h3 className="text-xl font-bold">X (Twitter)</h3>
              </div>

              {/* X Timeline Embed */}
              <div className="w-full">
                <a 
                  className="twitter-timeline" 
                  data-height="600" 
                  data-theme="dark"
                  href="https://x.com/odhiambookello5"
                >
                  Loading posts from @odhiambookello5...
                </a>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              </div>

              {/* X Quick Links */}
              <div className="grid grid-cols-2 gap-3 w-full mt-4">
                <a
                  href="https://x.com/odhiambookello5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-xs font-semibold">Posts</span>
                </a>
                
                <a
                  href="https://x.com/odhiambookello5/with_replies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 bg-accent/50 hover:bg-accent rounded-lg transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-xs font-semibold">Replies</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;

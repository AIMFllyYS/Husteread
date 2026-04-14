export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/20 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left space-y-2">
            <p className="font-serif text-lg font-bold text-primary tracking-wider">HUSTERead</p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} 华中科技大学读书会. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              *本站为非官方分享平台，与华中科技大学官方无关。
            </p>
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="mailto:contact@yusheng.email" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              联系我们
            </a>
            <span className="select-none text-muted-foreground/30">|</span>
            <a href="#" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              服务条款
            </a>
            <span className="select-none text-muted-foreground/30">|</span>
            <a href="#" className="hover:text-primary transition-colors hover:underline underline-offset-4">
              隐私权政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-code-bg text-code-fg rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono">
      <code>{children}</code>
    </pre>
  );
}

function CommandCard({
  command,
  description,
  usage,
  example,
  output,
}: {
  command: string;
  description: string;
  usage: string;
  example: string;
  output?: string;
}) {
  return (
    <div className="bg-surface border border-surface-border rounded-xl p-6 hover:border-accent/40 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className="bg-accent/10 text-accent font-mono text-sm font-semibold px-3 py-1 rounded-full">
          {command}
        </span>
      </div>
      <p className="text-muted mb-4">{description}</p>
      <CodeBlock>
        <span className="text-code-comment"># Usage</span>
        {"\n"}
        <span className="text-code-green">$</span>{" "}
        <span className="text-code-fg">{usage}</span>
        {"\n\n"}
        <span className="text-code-comment"># Example</span>
        {"\n"}
        <span className="text-code-green">$</span>{" "}
        <span className="text-code-fg">{example}</span>
        {output && (
          <>
            {"\n"}
            <span className="text-code-yellow">{output}</span>
          </>
        )}
      </CodeBlock>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-muted hover:text-accent transition-colors text-sm"
    >
      {children}
    </a>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-2xl font-bold mb-6 scroll-mt-24"
    >
      <span className="text-accent mr-2">#</span>
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-bold text-lg">
            <span className="text-accent">goto</span>
            <span className="text-muted font-normal text-sm ml-1.5">cli</span>
          </a>
          <div className="flex gap-6">
            <NavLink href="#overview">Overview</NavLink>
            <NavLink href="#installation">Install</NavLink>
            <NavLink href="#commands">Commands</NavLink>
            <NavLink href="#shell-setup">Shell Setup</NavLink>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>v1.0</span>
            <span className="text-accent/50">·</span>
            <span>Built with Go</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            Stop typing long
            <br />
            <span className="text-accent">directory paths.</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            <strong className="text-foreground">Goto</strong> is a tiny CLI tool that lets you
            bookmark directories with short names, then jump to them instantly from anywhere.
          </p>
          <CodeBlock>
            <span className="text-code-comment">
              # Save a directory with a short name
            </span>
            {"\n"}
            <span className="text-code-green">$</span>{" "}
            <span className="text-code-fg">gotocli goto add </span>
            <span className="text-code-blue">projects</span>{" "}
            <span className="text-code-yellow">~/Desktop/my_projects</span>
            {"\n"}
            <span className="text-code-pink">Saved &apos;projects&apos; -&gt; ~/Desktop/my_projects</span>
            {"\n\n"}
            <span className="text-code-comment"># Jump to it from anywhere</span>
            {"\n"}
            <span className="text-code-green">$</span>{" "}
            <span className="text-code-fg">goto </span>
            <span className="text-code-blue">projects</span>
            {"\n"}
            <span className="text-code-pink">~/Desktop/my_projects $</span>
          </CodeBlock>
        </section>

        {/* Overview */}
        <section id="overview" className="py-16 border-t border-surface-border">
          <SectionHeading id="overview">Overview</SectionHeading>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Bookmark",
                desc: "Save any directory with a short, memorable alias.",
                icon: "📌",
              },
              {
                title: "Jump",
                desc: "Instantly cd to any bookmarked directory by name.",
                icon: "⚡",
              },
              {
                title: "Manage",
                desc: "List all bookmarks or remove ones you no longer need.",
                icon: "📋",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-surface border border-surface-border rounded-xl p-5"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-muted text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-surface border border-surface-border rounded-xl p-6">
            <h3 className="font-semibold mb-3">How it works</h3>
            <p className="text-muted leading-relaxed">
              Goto stores your directory bookmarks in a simple JSON file at{" "}
              <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
                ~/.goto.json
              </code>
              . Each bookmark maps an alias name to an absolute directory path. The CLI
              binary reads and writes this file—no database, no daemon, no network
              calls. It&apos;s fast because there&apos;s nothing to slow it down.
            </p>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="py-16 border-t border-surface-border">
          <SectionHeading id="installation">Installation</SectionHeading>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">1. Build from source</h3>
              <p className="text-muted mb-4 text-sm">
                Requires Go 1.25+ installed on your system.
              </p>
              <CodeBlock>
                <span className="text-code-comment"># Clone the repository</span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"git clone <repo-url>"}
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"cd goto_project/goto"}
                {"\n\n"}
                <span className="text-code-comment"># Build the binary</span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"go build -o gotocli ./app"}
              </CodeBlock>
            </div>
            <div>
              <h3 className="font-semibold mb-3">2. Add to your PATH</h3>
              <p className="text-muted mb-4 text-sm">
                Move the binary somewhere on your PATH so you can run it from anywhere.
              </p>
              <CodeBlock>
                <span className="text-code-comment">
                  # Move to a directory in your PATH
                </span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"sudo mv gotocli /usr/local/bin/"}
                {"\n\n"}
                <span className="text-code-comment"># Verify it works</span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"gotocli goto list"}
                {"\n"}
                <span className="text-code-yellow">No directories saved.</span>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Commands */}
        <section id="commands" className="py-16 border-t border-surface-border">
          <SectionHeading id="commands">Commands</SectionHeading>
          <div className="grid gap-6">
            <CommandCard
              command="add"
              description="Save a directory path with a short alias name. Paths with spaces are supported."
              usage="gotocli goto add <name> <path>"
              example="gotocli goto add work ~/Documents/work/project-alpha"
              output="Saved 'work' -> ~/Documents/work/project-alpha"
            />
            <CommandCard
              command="jump"
              description="Retrieve the path for a saved alias. Prints the path to stdout so it can be used with cd via a shell function."
              usage="gotocli goto jump <name>"
              example="gotocli goto jump work"
              output="~/Documents/work/project-alpha"
            />
            <CommandCard
              command="list"
              description="Display all saved directory bookmarks and their paths."
              usage="gotocli goto list"
              example="gotocli goto list"
              output={"  work -> ~/Documents/work/project-alpha\n  docs -> ~/Documents"}
            />
            <CommandCard
              command="remove"
              description="Delete a saved directory bookmark by its alias name."
              usage="gotocli goto remove <name>"
              example="gotocli goto remove work"
              output="Removed 'work'"
            />
          </div>
        </section>

        {/* Shell Setup */}
        <section id="shell-setup" className="py-16 border-t border-surface-border">
          <SectionHeading id="shell-setup">Shell Setup</SectionHeading>
          <p className="text-muted mb-6 leading-relaxed">
            The <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">jump</code>{" "}
            command prints a directory path but can&apos;t change your shell&apos;s working
            directory by itself. Add this shell function to your{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              ~/.zshrc
            </code>{" "}
            or{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              ~/.bashrc
            </code>{" "}
            to enable{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              goto &lt;name&gt;
            </code>{" "}
            to actually change directories:
          </p>
          <CodeBlock>
            <span className="text-code-comment">
              # Add to ~/.zshrc or ~/.bashrc
            </span>
            {"\n"}
            <span className="text-code-blue">goto</span>
            {"() {\n"}
            {"  local dest\n"}
            {"  dest=$(gotocli goto jump \"$1\")\n"}
            {"  if [ $? -eq 0 ] && [ -n \"$dest\" ]; then\n"}
            {"    cd \"$dest\"\n"}
            {"  else\n"}
            {"    echo \"goto: '$1' not found\"\n"}
            {"  fi\n"}
            {"}"}
            {"\n\n"}
            <span className="text-code-comment"># Then reload your shell</span>
            {"\n"}
            <span className="text-code-green">$</span> {"source ~/.zshrc"}
          </CodeBlock>
          <div className="mt-6 bg-accent/5 border border-accent/20 rounded-xl p-5">
            <p className="text-sm text-muted leading-relaxed">
              <strong className="text-foreground">Why a shell function?</strong>{" "}
              A subprocess (like a Go binary) cannot change the parent shell&apos;s
              working directory. The shell function calls{" "}
              <code className="text-accent">gotocli goto jump</code>, captures the
              output path, and runs{" "}
              <code className="text-accent">cd</code> in the current shell session.
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="py-16 border-t border-surface-border">
          <SectionHeading id="quick-reference">Quick Reference</SectionHeading>
          <div className="bg-surface border border-surface-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface">
                  <th className="text-left font-semibold px-5 py-3">Action</th>
                  <th className="text-left font-semibold px-5 py-3">Command</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  ["Save a directory", "gotocli goto add <name> <path>"],
                  ["Jump to a directory", "goto <name>"],
                  ["List all bookmarks", "gotocli goto list"],
                  ["Remove a bookmark", "gotocli goto remove <name>"],
                  ["Config file location", "~/.goto.json"],
                ].map(([action, cmd]) => (
                  <tr key={action} className="border-b border-surface-border last:border-0">
                    <td className="px-5 py-3 font-sans text-muted">{action}</td>
                    <td className="px-5 py-3 text-accent">{cmd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border mt-8">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted">
          <span>
            <span className="text-accent font-semibold">goto</span> — built with Go
          </span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  );
}

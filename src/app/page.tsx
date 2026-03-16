import Link from "next/link";

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
            <span>Cross-Platform · Built with Go</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            Stop typing long
            <br />
            <span className="text-accent">directory paths.</span>
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            <strong className="text-foreground">Goto</strong> is a cross-platform CLI tool that lets you
            bookmark directories with short names, then jump to them instantly from anywhere.
          </p>
          <CodeBlock>
            <span className="text-code-comment">
              # Save a directory with a short name
            </span>
            {"\n"}
            <span className="text-code-green">$</span>{" "}
            <span className="text-code-fg">goto add </span>
            <span className="text-code-blue">projects</span>{" "}
            <span className="text-code-yellow">/home/user/projects</span>
            {"\n"}
            <span className="text-code-pink">Saved &apos;projects&apos; -&gt; /home/user/projects</span>
            {"\n\n"}
            <span className="text-code-comment"># Jump to it from anywhere</span>
            {"\n"}
            <span className="text-code-green">$</span>{" "}
            <span className="text-code-fg">goto jump </span>
            <span className="text-code-blue">projects</span>
            {"\n"}
            <span className="text-code-pink">/home/user/projects $</span>
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
                title: "Cross-Platform",
                desc: "Works on Mac, Linux, and Windows with shell-specific setup.",
                icon: "🌐",
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
            <ul className="text-muted leading-relaxed space-y-2">
              <li>
                The <strong className="text-foreground">Go binary</strong> (
                <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">gotocli</code>
                ) handles all data storage and retrieval, saving directories to{" "}
                <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">~/.goto.json</code>
              </li>
              <li>
                The <strong className="text-foreground">shell wrapper</strong> (
                <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">goto</code>
                ) intercepts the{" "}
                <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">jump</code>
                {" "}command and runs{" "}
                <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">cd</code>
                {" "}in the current shell
              </li>
              <li>
                This is the same pattern used by popular tools like{" "}
                <strong className="text-foreground">z</strong> and{" "}
                <strong className="text-foreground">autojump</strong>
              </li>
            </ul>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="py-16 border-t border-surface-border">
          <SectionHeading id="installation">Installation</SectionHeading>
          <p className="text-muted mb-8 leading-relaxed">
            You can either download a pre-built binary or build from source.
          </p>

          <div className="space-y-10">
            {/* Option A: Download */}
            <div>
              <h3 className="font-semibold mb-1 text-lg">Option A — Download pre-built binary</h3>
              <p className="text-muted mb-4 text-sm">
                Grab the latest binary for your platform from the {""}
                <Link
                  href="https://github.com/CharlesChinedum/goto-cli/releases/tag/v1.1.0"
                  target="_blank"
                  className="text-accent-light hover:text-accent"
                >releases page.</Link>{" "}
                No dependencies required.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-muted mb-3 text-sm font-medium">Mac & Linux</p>
                  <CodeBlock>
                    <span className="text-code-comment"># Download the binary for your platform from the releases page</span>
                    {"\n"}
                    <span className="text-code-green">$</span>{" "}
                    {"chmod +x gotocli"}
                    {"\n"}
                    <span className="text-code-green">$</span>{" "}
                    {"sudo mv gotocli /usr/local/bin/"}
                  </CodeBlock>
                </div>
                <div>
                  <p className="text-muted mb-3 text-sm font-medium">Windows</p>
                  <CodeBlock>
                    <span className="text-code-comment"># Download gotocli.exe from the releases page</span>
                    {"\n"}
                    {"Move gotocli.exe to C:\\Program Files\\gotocli\\"}
                  </CodeBlock>
                </div>
              </div>
            </div>

            {/* Option B: Build from source */}
            <div>
              <h3 className="font-semibold mb-1 text-lg">Option B — Build from source</h3>
              <p className="text-muted mb-4 text-sm">
                Requires <a href="https://go.dev/dl/" className="text-accent hover:underline">Go 1.25+</a> installed on your system.
              </p>
              <CodeBlock>
                <span className="text-code-comment"># Clone the repository</span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"git clone git@github.com:CharlesChinedum/goto-cli.git"}
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"cd goto-cli"}
                {"\n\n"}
                <span className="text-code-comment"># Build the binary</span>
                {"\n"}
                <span className="text-code-green">$</span>{" "}
                {"go build -o gotocli app/main.go"}
              </CodeBlock>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-muted mb-3 text-sm font-medium">Then add to your PATH — Mac & Linux</p>
                  <CodeBlock>
                    <span className="text-code-green">$</span>{" "}
                    {"sudo mv gotocli /usr/local/bin/"}
                  </CodeBlock>
                </div>
                <div>
                  <p className="text-muted mb-3 text-sm font-medium">Then add to your PATH — Windows</p>
                  <CodeBlock>
                    {"Move gotocli.exe to C:\\Program Files\\gotocli\\"}
                  </CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shell Setup */}
        <section id="shell-setup" className="py-16 border-t border-surface-border">
          <SectionHeading id="shell-setup">Shell Setup</SectionHeading>
          <p className="text-muted mb-6 leading-relaxed">
            A shell wrapper function is required so that{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              goto jump
            </code>{" "}
            can actually change your working directory. The wrapper also lets you use{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              goto
            </code>{" "}
            directly instead of{" "}
            <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">
              gotocli goto
            </code>
            .
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Mac & Linux — add to <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">~/.zshrc</code> or <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">~/.bashrc</code></h3>
              <CodeBlock>
                <span className="text-code-blue">function</span>
                {" goto() {\n"}
                {"    local command=$1\n"}
                {"    local name=$2\n"}
                {"    local path=$3\n"}
                {"    local extra=$4\n"}
                {"\n"}
                {"    if [ \"$command\" = \"jump\" ]; then\n"}
                {"        TARGET=$(/usr/local/bin/gotocli goto jump \"$name\" 2>/dev/null)\n"}
                {"        if [ -z \"$TARGET\" ]; then\n"}
                {"            echo \"No directory found for '$name'\"\n"}
                {"        else\n"}
                {"            cd \"$TARGET\"\n"}
                {"        fi\n"}
                {"    elif [ \"$command\" = \"edit\" ]; then\n"}
                {"        /usr/local/bin/gotocli goto edit \"$name\" \"$path\"\n"}
                {"    elif [ \"$command\" = \"rename\" ]; then\n"}
                {"        /usr/local/bin/gotocli goto rename \"$name\" \"$path\"\n"}
                {"    else\n"}
                {"        /usr/local/bin/gotocli goto \"$command\" \"$name\" \"$path\" \"$extra\"\n"}
                {"    fi\n"}
                {"}"}
                {"\n\n"}
                <span className="text-code-comment"># Then reload your shell</span>
                {"\n"}
                <span className="text-code-green">$</span> {"source ~/.zshrc"}
              </CodeBlock>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Windows — add to PowerShell <code className="bg-accent/10 text-accent text-sm px-1.5 py-0.5 rounded">$PROFILE</code></h3>
              <CodeBlock>
                <span className="text-code-blue">function</span>
                {" goto {\n"}
                {"    param($command, $name, $path, $extra)\n"}
                {"\n"}
                {"    if ($command -eq \"jump\") {\n"}
                {"        $TARGET = & \"C:\\Program Files\\gotocli\\gotocli.exe\" goto jump $name 2>$null\n"}
                {"        if (-not $TARGET) {\n"}
                {"            Write-Host \"No directory found for '$name'\"\n"}
                {"        } else {\n"}
                {"            Set-Location $TARGET\n"}
                {"        }\n"}
                {"    } elseif ($command -eq \"edit\") {\n"}
                {"        & \"C:\\Program Files\\gotocli\\gotocli.exe\" goto edit $name $path\n"}
                {"    } elseif ($command -eq \"rename\") {\n"}
                {"        & \"C:\\Program Files\\gotocli\\gotocli.exe\" goto rename $name $path\n"}
                {"    } else {\n"}
                {"        & \"C:\\Program Files\\gotocli\\gotocli.exe\" goto $command $name $path $extra\n"}
                {"    }\n"}
                {"}"}
              </CodeBlock>
            </div>
          </div>

          <div className="mt-6 bg-accent/5 border border-accent/20 rounded-xl p-5">
            <p className="text-sm text-muted leading-relaxed">
              <strong className="text-foreground">Why a shell wrapper?</strong>{" "}
              A subprocess (like a Go binary) cannot change the parent shell&apos;s
              working directory. The wrapper intercepts the{" "}
              <code className="text-accent">jump</code> command to run{" "}
              <code className="text-accent">cd</code> in the current shell session,
              and forwards all other commands directly to{" "}
              <code className="text-accent">gotocli</code>.
            </p>
          </div>
        </section>

        {/* Commands */}
        <section id="commands" className="py-16 border-t border-surface-border">
          <SectionHeading id="commands">Commands</SectionHeading>
          <div className="grid gap-6">
            <CommandCard
              command="add"
              description="Save a directory path with a short alias name. Paths with spaces are supported."
              usage="goto add <name> <path>"
              example="goto add projects /home/user/projects"
              output="Saved 'projects' -> /home/user/projects"
            />
            <CommandCard
              command="jump"
              description="Jump to a saved directory. The shell wrapper intercepts this command to cd into the target path."
              usage="goto jump <name>"
              example="goto jump projects"
            />
            <CommandCard
              command="list"
              description="Display all saved directory bookmarks and their paths."
              usage="goto list"
              example="goto list"
              output={"  projects -> /home/user/projects\n  docs -> /home/user/Documents"}
            />
            <CommandCard
              command="remove"
              description="Delete a saved directory bookmark by its alias name."
              usage="goto remove <name>"
              example="goto remove projects"
              output="Removed 'projects'"
            />
            <CommandCard
              command="edit"
              description="Update the path of an existing saved directory bookmark."
              usage="goto edit <name> <newpath>"
              example="goto edit projects /home/user/new-projects"
            />
            <CommandCard
              command="rename"
              description="Rename an existing directory bookmark without changing its path."
              usage="goto rename <oldname> <newname>"
              example="goto rename projects work-projects"
            />
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
                  ["Save a directory", "goto add <name> <path>"],
                  ["Jump to a directory", "goto jump <name>"],
                  ["List all bookmarks", "goto list"],
                  ["Remove a bookmark", "goto remove <name>"],
                  ["Edit a directory path", "goto edit <name> <newpath>"],
                  ["Rename a bookmark", "goto rename <oldname> <newname>"],
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

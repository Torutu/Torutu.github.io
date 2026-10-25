import { CollapsibleSection } from "../../utils/pageContext";

const whatIsMinishell = (
  <>
    <h2 className="rightSideSection__h2">What is Minishell?</h2>
    <p className="rightSideSection__p">
      A bash-like shell built from scratch in C. Minishell replicates core Unix shell functionality 
      including built-in commands (cd, echo, export, unset, exit, env, pwd), pipe operations, 
      input/output redirections ({"<"}, {">"},{">>"}), and heredocs ({"<<"}). It parses user input, 
      handles environment variables, manages process forking, and supports both single and piped 
      command execution. Built as an exercise in understanding terminal internals and system-level 
      programming.
    </p>
  </>
);

const InputParsing = (
  <>
    <CollapsibleSection title="Input Parsing & Tokenization">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Reads user input from readline() prompt and breaks it into tokens (individual command parts). 
        Each token is classified by type: BUILTIN, EXEC, ARG, PIPE, RED_IN, RED_OUT, HEREDOC, APPEND. 
        Handles quote removal, environment variable expansion, and spaces within arguments.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        readline() captures user input. ft_strtok() splits by delimiters (space, tab, newline). 
        For each token, chunky_checker() determines type by testing against patterns: builtin check, 
        flag check, pipe detection, redirection detection, command lookup, argument detection. 
        Tokens linked in a list with prev/next pointers for sequential processing. Quote removal 
        and environment variable expansion happen during tokenization. Syntax validation ensures 
        valid token sequences.
      </p>
    </CollapsibleSection>
  </>
);

const BuiltInCommands = (
  <>
    <CollapsibleSection title="Built-In Commands">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Executes shell built-in commands without spawning child processes. Supports: pwd (print working 
        directory), env (display environment), echo (print text), cd (change directory), export (set 
        variables), unset (remove variables), and exit (close shell). Each has unique behavior and 
        error handling.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        built_ins() checks first token value against command strings. pwd uses getcwd() to display 
        current directory. env iterates linked list and prints entries containing "=". echo prints 
        remaining tokens with -n flag support. cd validates path, updates PWD/OLDPWD environment 
        variables. export parses key=value pairs, adds/updates environment list. unset removes 
        variables by key. exit validates numeric argument, updates exit code, and terminates shell.
      </p>
    </CollapsibleSection>
  </>
);

const PipesAndMultipleCommands = (
  <>
    <CollapsibleSection title="Pipes & Multiple Commands">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Chains multiple commands together with pipes (|). Output of one command becomes input for next. 
        Creates appropriate file descriptors and manages data flow between processes. Counts pipes, 
        creates fork per command, and synchronizes parent waiting on all children.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Detects PIPE tokens in token list, counts them to determine command count. For each command, 
        forks child process. Pipe created between consecutive commands using pipe(). First command 
        reads stdin, last writes stdout, middle commands redirect both. Parent process waits via 
        wait() until all children complete. Exit codes collected from WEXITSTATUS macro. 
        Synchronization pipe used for safe startup signaling.
      </p>
    </CollapsibleSection>
  </>
);

const Redirections = (
  <>
    <CollapsibleSection title="Input/Output Redirections">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Redirects command input/output to files or here documents. Supports: {"<"} (input from file), 
        {">"} (output to file, overwrite), {">>"} (append to file), and {"<<"} (heredoc - multi-line input). 
        Properly handles file descriptors and ensures data flows to correct destinations.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        find_redirection() scans command array for redirect symbols. check_and_handle_redirection() 
        routes to appropriate function. {"<"} calls open() on file, dup2() to stdin. {">"} creates/truncates 
        file, dup2() to stdout. {">>"} opens with O_APPEND flag. {"<<"} calls here_doc() which reads 
        lines until delimiter found, pipes content to command stdin. Multiple redirections handled 
        left-to-right, each overwriting previous. File errors trigger immediate child exit with 
        appropriate error code.
      </p>
    </CollapsibleSection>
  </>
);

const EnvironmentManagement = (
  <>
    <CollapsibleSection title="Environment Variable Management">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Maintains shell environment variables as linked list. Supports expanding variables in command 
        strings (e.g., echo $HOME), exporting new variables, unsetting variables, and passing 
        environment to child processes. Tracks SHELL_LEVEL to indicate nested shells.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Environment stored in t_env linked list with key, value, and full content string. On startup, 
        original env array converted to linked list via ll_env(). expand_env_variables() finds $ 
        symbols, extracts variable name, looks up in linked list. export command processes key=value 
        tokens, splits on "=", validates key format, adds to list if new, updates if exists. 
        unset searches by key, removes node from list. env_arr_updater() converts linked list back 
        to array for execve() calls. SHELL_LEVEL incremented for each nested shell.
      </p>
    </CollapsibleSection>
  </>
);

const HereDocs = (
  <>
    <CollapsibleSection title="Here Documents (Heredoc)">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Accepts multi-line input directly in shell until delimiter encountered. Typed interactively 
        with custom readline prompt (":3 "). Input processed (variables expanded), piped to command. 
        Supports multiple heredocs in single command line.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        here_doc() creates anonymous pipe. Enters loop with readline(":3 ") prompting user. Each 
        line compared to delimiter string. If match found, loop exits. Otherwise, line passed to 
        expand_env_variables() for variable substitution, written to pipe with newline appended. 
        Tracks last heredoc index to write completion signal via sync_pipe. Returns pipe read end 
        as file descriptor for child process stdin. Multiple heredocs supported by recursively 
        building redirection chain.
      </p>
    </CollapsibleSection>
  </>
);

const ProcessExecution = (
  <>
    <CollapsibleSection title="Process Execution & Forking">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Spawns child processes to execute external commands. Searches PATH for executable, handles 
        absolute paths, and manages file descriptor inheritance. Parent waits and collects exit codes. 
        Handles permission errors and "command not found" scenarios.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        For each command, fork() creates child process. In child: dup2() redirects stdin/stdout/stderr, 
        finds binary via access_path() (searches PATH), calls execve() with command array and environment. 
        If execve fails (permission/not found), exit() with error code 126 or 127. Parent uses wait() 
        to block until child terminates, extracts exit code via WEXITSTATUS. Multiple children handled 
        via loop. Synchronization pipe prevents race conditions during startup.
      </p>
    </CollapsibleSection>
  </>
);

const SignalHandling = (
  <>
    <CollapsibleSection title="Signal Handling">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p_end">
        Captures and manages Unix signals (Ctrl+C, Ctrl+D) for proper shell behavior. 
        Prevents child processes from outputting prompt during command execution. Handles SIGINT 
        appropriately based on context (interactive shell vs running command).
      </p>
    </CollapsibleSection>
  </>
);

const featureBreakdown = (
  <>
    <h1 className="rightSideSection__h1">Features</h1>
    {InputParsing}
    {BuiltInCommands}
    {PipesAndMultipleCommands}
    {Redirections}
    {EnvironmentManagement}
    {HereDocs}
    {ProcessExecution}
    {SignalHandling}
  </>
);

export const minishellContent = (
  <>
    <h1 className="rightSide__h">Minishell</h1>
    <div className="project-cta">
      <a className="project-cta__secondary" href="https://github.com/Torutu/minishell" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    </div>
    {whatIsMinishell}
    {featureBreakdown}
  </>
);

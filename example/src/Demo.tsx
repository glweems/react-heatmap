import React, { useState, FormEventHandler } from 'react';
import GitHubCalendar, { Theme } from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import { format } from 'date-fns';

import 'typeface-public-sans';
import './Demo.css';

import CodeBlock from './CodeBlock';
import ForkMe from './ForkMe';

const exampleTheme: Theme = {
  background: 'transparent',
  text: '#000',
  grade4: 'hsl(338, 78%, 30%)',
  grade3: 'hsl(338, 78%, 44%)',
  grade2: 'hsl(338, 78%, 58%)',
  grade1: 'hsl(338, 78%, 72%)',
  grade0: '#eee',
};

const Demo: React.FC = () => {
  const [username, setUsername] = useState('grubersjoe');
  const input = React.createRef<HTMLInputElement>();

  const updateUsername: FormEventHandler = event => {
    event.preventDefault();
    if (input.current) {
      setUsername(String(input.current.value).toLowerCase());
    }
  };

  return (
    <div>
      <header>
        <ForkMe />
        <div className="container">
          <h1>GitHub Contributions Calendar </h1>
          <div>A React component to display a GitHub contributions graph </div>
          <form onSubmit={updateUsername}>
            <input type="text" placeholder="Enter your GitHub username" ref={input} required />
            <button type="submit">Show calendar</button>
          </form>
        </div>
      </header>

      <main className="container">
        <section>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=grubersjoe&repo=react-github-calendar&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="170"
            height="30"
            title="GitHub"
          />
          <h4 style={{ fontWeight: 'normal', margin: '1em 0 0.5em' }}>
            <a href="https://github.com/grubersjoe">@grubersjoe</a> on GitHub
          </h4>
          <GitHubCalendar username={username}>
            <ReactTooltip delayShow={50} html />
          </GitHubCalendar>
        </section>

        <section>
          <h2>Breaking changes</h2>
          <p>
            Starting with v2 the title bar (<em>@username on GitHub</em>) is no longer shown to
            improve reusability of this component. Also the total contribution count below each
            graph can be hidden by setting the <code>showTotalCount</code> property to{' '}
            <code>false</code>.
          </p>
        </section>

        <section>
          <h2>Installation</h2>
          <CodeBlock style={{ marginTop: '0.5rem' }}>yarn install react-github-calendar</CodeBlock>
          <p>Then in your code:</p>
          <CodeBlock>
            {`import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar username="${username}" />`}
          </CodeBlock>
        </section>

        <section>
          <h2>Component properties</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>username</td>
                  <td>string</td>
                  <td>-</td>
                  <td>
                    A GitHub username (<em>required, obviously</em>).
                  </td>
                </tr>
                <tr>
                  <td>blockMargin</td>
                  <td>number</td>
                  <td>2</td>
                  <td>Margin between blocks in Pixels.</td>
                </tr>
                <tr>
                  <td>blockSize</td>
                  <td>number</td>
                  <td>12</td>
                  <td>Size of one block (one day) in Pixels.</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>
                    string|<a href="https://www.npmjs.com/package/tinycolor2">Color</a>
                  </td>
                  <td>undefined</td>
                  <td>Base color to compute graph intensity colors (see below).</td>
                </tr>
                <tr>
                  <td>dateFormat</td>
                  <td>string</td>
                  <td>'MMM d, yyyy'</td>
                  <td>
                    A{' '}
                    <code>
                      <a href="https://date-fns.org/v2.14.0/docs/format">date-fns/format</a>
                    </code>{' '}
                    compatible date string.
                  </td>
                </tr>
                <tr>
                  <td>fontSize</td>
                  <td>number</td>
                  <td>14</td>
                  <td>Font size for text in chart in Pixels.</td>
                </tr>
                <tr>
                  <td>fullYear</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>
                    Whether to show the whole last year starting now or this year only (starting in
                    January).
                  </td>
                </tr>
                <tr>
                  <td>showTotalCount</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Whether to show number of total contributions below each graph.</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Theme</td>
                  <td>
                    <em>GitHub theme</em>
                  </td>
                  <td>An object specifying all theme colors explicitly (see below).</td>
                </tr>
                <tr>
                  <td>tooltips</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>
                    Whether to add <code>data-tip</code> attributes to the blocks. Add{' '}
                    <code>react-tooltip</code> and use it as child of this component. See below
                    example.
                  </td>
                </tr>
                <tr>
                  <td>years</td>
                  <td>number[]</td>
                  <td>[{format(new Date(), 'yyyy')}]</td>
                  <td>
                    List of to be rendered years. Defaults to the current year. If no data is
                    available the chart for this year will be ommited.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Examples</h2>

          <ol>
            <li>
              <a href="#show-contributions-of-last-year">Show contributions of last year</a>
            </li>
            <li>
              <a href="#display-this-year-only">Display this year only</a>
            </li>
            <li>
              <a href="#show-several-years">Show several years</a>
            </li>
            <li>
              <a href="#set-the-color-theme">Set the color theme</a>
            </li>
            <li>
              <a href="#add-tooltips">Add tooltips</a>
            </li>
            <li>
              <a href="#different-block-size">Different block size</a>
            </li>
            <li>
              <a href="#different-block-margin">Different block margin</a>
            </li>
            <li>
              <a href="#chart-font-size">Chart font size</a>
            </li>
            <li>
              <a href="#hide-total-count">Hide contribution count</a>
            </li>
          </ol>

          <hr />

          <h3 id="show-contributions-of-last-year">Show contributions of last year</h3>
          <p>By default the last whole year is shown.</p>
          <CodeBlock>{`<GitHubCalendar username="${username}" />`}</CodeBlock>
          <GitHubCalendar username={username} />

          <hr />

          <h3 id="display-this-year-only">Display this year only</h3>
          <p>
            You might prefer the calendar for the current year to start in January (instead of
            showing the last twelve months).
          </p>
          <CodeBlock>{`<GitHubCalendar username="${username}" fullYear={false} />`}</CodeBlock>
          <GitHubCalendar username={username} fullYear={false} />

          <hr />

          <h3 id="show-several-years">Show several years</h3>
          <p>To display multiple years, pass an array into the component:</p>
          <CodeBlock>{`<GitHubCalendar username="${username}" years={[2018, 2017]} />`}</CodeBlock>
          <GitHubCalendar username={username} years={[2018, 2017]} />

          <hr />

          <h3 id="set-the-color-theme">Set the color theme</h3>
          <p>
            Either set a base color (any valid CSS color) to calculate the color hues for the
            contribution intensity automatically or specify the different theme colors explicitly.
            If a color is set the theme will be ignored. If neither color or theme is set, the
            standard GitHub colors will be used (as in these examples).
          </p>
          <CodeBlock>{`<GitHubCalendar username="${username}" color="hsl(203, 82%, 33%)" />`}</CodeBlock>
          <GitHubCalendar username={username} color="hsl(203, 82%, 33%)" />
          <p>Set the colors explicitly like this:</p>
          <CodeBlock>
            {`const exampleTheme = {
  background: 'transparent',
  text: '#000',
  grade4: 'hsl(338, 78%, 30%)',
  grade3: 'hsl(338, 78%, 44%)',
  grade2: 'hsl(338, 78%, 58%)',
  grade1: 'hsl(338, 78%, 72%)',
  grade0: '#eee',
};

<GitHubCalendar username="${username}" theme={exampleTheme} />`}
          </CodeBlock>
          <GitHubCalendar username={username} theme={exampleTheme} />

          <hr />

          <h3 id="add-tooltips">Add tooltips</h3>
          <p>
            In order to show tooltips on hover, you need to add another dependency{' '}
            <code>react-tooltip</code>. Add this component then as child of the calendar. Make sure
            to enable the <code>html</code> property in the <code>ReactTooltip</code> component to
            display the message correctly.
          </p>
          <CodeBlock>
            {`<GitHubCalendar username="${username}">
  <ReactTooltip delayShow={50} html />
</GitHubCalendar>`}
          </CodeBlock>
          <div>
            <GitHubCalendar username={username}>
              <ReactTooltip delayShow={50} html />
            </GitHubCalendar>
          </div>

          <hr />

          <h3 id="different-block-size">Different block size</h3>
          <p>The block size (12px per default) is configurable:</p>
          <CodeBlock>{`<GitHubCalendar username="${username}" blockSize={10} />`}</CodeBlock>
          <GitHubCalendar username={username} blockSize={10} />

          <hr />

          <h3 id="different-block-margin">Different block margin (and size)</h3>
          <p>Analogously the block margin can be adjusted.</p>
          <CodeBlock>{`<GitHubCalendar username="${username}" blockSize={10} blockMargin={4} />`}</CodeBlock>
          <GitHubCalendar username={username} blockSize={10} blockMargin={4} />

          <hr />

          <h3 id="chart-font-size">Chart font size</h3>
          <p>
            There also is a property to set the fontsize of the text inside the chart. This is
            useful if a large block size or margin is set. The default base font size is 14px.
          </p>
          <CodeBlock>{`<GitHubCalendar username="${username}" fontSize={16} />`}</CodeBlock>
          <GitHubCalendar username={username} fontSize={16} />

          <hr />

          <h3 id="hide-total-count">Hide contribution count</h3>
          <p>
            Finally, you might want to hide the count of contributions per year below the graph. Set
          </p>
          <CodeBlock>{`<GitHubCalendar username="${username}" showTotalCount={false} />`}</CodeBlock>
          <GitHubCalendar username={username} showTotalCount={false} />
        </section>
      </main>
    </div>
  );
};

export default Demo;

# Nextjs 13 and some other stuff.

### Table of Contents

| No. | Topics                                                                                                                                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1   | [CSR and SSR](#client-side-rendering-and-server-side-rendering)
| 2   | [CRP - Critical rendering path](#critical-rendering-path)
<br />
## Client-side rendering and Server-side rendering
<table>
    <thead>
        <th style="width: 20vw"></th>
        <th style="width: 40vw; text-align: center">SSR</th>
        <th style="width: 40vw; text-align: center">CSR</th>
    </thead>
    <tbody style="text-align: left">
        <tr>
            <td>
                what is it?
            </td>
            <td>
                SSR is the process of rendering the <b>complete</b> HTML page on the server and return to the client.
            </td>
            <td>
                CSR is the process of rendering only a bare-bones HTML page ont he server with the complete page render happening on the browser by downloading and executing the necessary javascript
            </td>
        </tr>
        <tr>
            <td>
                how it works?
            </td>
            <td>
                <li>
                    Client sends a request to the server
                </li>
                <li>
                    Server gets the data from db or cloud
                </li>
                <li>
                    Filled it into HTML page and response to the client
                </li>
                <li>
                    Client will follow the <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path" target="_blank">CRP</a> and render the page
                </li>
            </td>
            <td>
                <li>
                    First the client send a GET request to the server
                </li>
                <li>
                    Then the server will response bare-bones HTML page
                </li>
                <li>
                    The client renders it [CRP]() -> [FP]()
                </li>
                <li>
                    Then download, parse and execute the javascript bundle to boot up the app which will fetch any data needed
                </li>
                <li>
                    Re-render the app
                </li>
            </td>
        </tr>
        <tr>
            <td>
                pros and cons
            </td>
            <td>
                pros:
                <br />
                <li>
                    faster First Contentful Paint (FCP) and Time To Interactive (TTI)
                </li>
                <li>
                    SEO optimized
                </li>
                <li>
                    additional budget for client-side Javascript
                </li>
                <li>
                    client computation and bandwidth offloaded to the server
                </li>
                <br />
                cons:
                <br />
                <li>
                    full page reload required for some interactions
                </li>
                <li>
                    slow Time To First Byte (TTFB)
                </li>
                <li>
                    since all processing placed on the server, response may be delayed by: slow network, server code not optimized, multiple simultaneous users causing excess load on the server
                </li>
            </td>
            <td>
                pros:
                <br />
                <li>
                    clear the separation between client and server code
                </li>
                <li>
                    interactive app after first load
                </li>
                <li>navigation with less data and no refresh -> faster and more responsive app</li>
                <li>data fetched on client uses bandwidth but can be cached</li>
                => turn to SPA
                <br />
                cons:
                <br />
                <li>slow loading times</li>
                <li>slow first load, worse with bigger JS bundles (which are increasing)</li>
                <li>complete HTML can not be cached</li>
                <li>data fetching might delay interactions depending on size</li>
                <li>SEO considerations</li>
            </td>
        </tr>
        <tr>
            <td>
                when to use
            </td>
            <td>
                <li>
                    when initial load times are more important than subsequent ones - storefront
                </li>
                <li>
                    when javascript and heavy interactivity is not required on the client - content website
                </li>
                <li>
                    when client-side routing is not required
                </li>
                <li>
                    when you want to offload computation and bandwidth from the client to the server
                </li>
                => Perfect for storefront and content website
            </td>
            <td>
                <li>When slow initial first load is not a problem</li>
                <li>when you need a complex site with a lot of interactivity</li>
                <li>when you need navigation without full page reload</li>
                <li>when SEO is not a top priority</li>
            </td>
        </tr>
    </tbody>
</table>

## Critical rendering path
> CRP is the sequence of steps the browser goes through to convert the HTML, CSS and Javascript into pixels on the screen, includes [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), [CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model), render tree and layout

### How it works
<ul>
    <li>First the client sends a request, then get a response of HTML</li>
    <li>Browser begins parsing HTML, create DOM</li>
    <li>Browser makes request every time it found an external resource like script, stylesheet, embedded image references, ...</li>
    <li>After that, browser started construct CSS object model</li>
    <li>With completed DOM and CSSOM, browser builds the render tree</li>
    <li>After the render tree completed rendering, layout occurs, defining the location and size of all render tree elements -> the page is rendered or "painted" on screen</li>
</ul>

### Document object model
<ul>
    <li>HTML response turns into tokens which turns into node (which turns into DOM tree)</li>
    <li>A single DOM node start with startTag token and end with endTag token</li>
    <li>Node are connected into a DOM tree based on token hierarchy</li>
    <li>If a start-end token come between another, we have node in node</li>
</ul>

### CSS object model
<ul>
    <li>CSSOM contains all the information how to style DOM</li>
    <li>CSSOM is not incremental</li>
    <li>CSS is render blocking: browser blocks page render until all the CSS are received and processed</li>
    <li>C in CSS mean "Cascade", CSS rules cascade down.</li>
    <li>Parser converts tokens to nodes, descendant will inherit its parent</li>
    <li>Incremental processing don't apply to CSS like HTML because subsequent rules may override the previous ones</li>
    <li>CSS is parsed and CSSOM gets built, but can't be used to build Render Tree until it is completely parsed</li>
    <li>The more specificity of class name, the more browser required to work to resolve it. (ex: .foo{} faster than .bar .foo{})</li>
</ul>

### Render Tree
<ul>
    <li>After DOM and CSSOM are completely parsed, Render Tree captures it</li>
    <li>Browser checks every node, starting from root of the DOM tree, determines which CSS rules attached it, and construct the render tree</li>
    <li>Render Tree only captures visible content (head section doesn't contain any, display: none included)</li>
</ul>

### Layout
<ul>
    <li>Layout is becomes possible when the tree is built</li>
    <li>it dependent on screen size</li>
    <li>Layout step determines elements position, size adn relation to each other</li>
    <li>
        Viewport meta tag defines the width of layout viewport, without it, default viewport will be applied (960px generally)
        ```
        <meta name="viewport" content="width=device-width">
        ```
    </li>
    <li>Layout performance is impacted by the DOM (more nodes, more time layout takes)</li>
    <li>...</li>
</ul>

### Paint
<ul>
    <li>Once Render Tree is created and Layout occurs, the pixels can be painted on screen</li>
    <li>After that, only impacted areas will be re-painted, browsers are optimized to repaint the minimum area required.</li>
    <li>Painting is a very fast process, it's not the place to focus when improving performance</li>
    <li>It is important to remember to allow for both layout and re-paint times when measuring how long an animation frame may take</li>
</ul>

### Optimizing for CRP
<ul>
    <li>Prioritizing which resources get loaded</li>
    <li>Control the order of loading and reducing file sizes</li>
    <li>Minimize number of critical resources, deferring them, marking as async</li>
    <li>Optimizing the number of requests required and file size of each request</li>
    <li>Prioritizing the downloading of critical assets, thereby shortening the critical path length</li>
</ul>
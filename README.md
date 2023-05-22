# Nextjs and some changes in version 13.

## Learning nextjs and take note!


### Table of Contents

| No. | Topics                                                                                                                                                                                                                        |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | [CSR and SSR](#csrssr)                                                                                                                                                                                                 |
<!-- ### Table of contents
- React server component
- /app routing -->

<h2 id="#csrssr">
    Client-side rendering and Server-side rendering
</h2>
Because in the new update, React server component becomes something kinda powerful and represents everywhere so I believed that it is important to understand those concepts

<table style="width: 100vw">
    <thead>
        <th style="width: 10vw"></th>
        <th style="width: 45vw; text-align: center">SSR</th>
        <th style="width: 45vw; text-align: center">CSR</th>
    </thead>
    <tbody style="text-align: left">
        <tr>
            <td>
                what is it?
            </td>
            <td>n
                SSR is the process of rendering the <b>complete</b> HTML page on the server and return to the client.
            </td>
            <td>
                CSR
            </td>
        </tr>
        <tr>
            <td>
                how it works?
            </td>
            <td>
            <ul>
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
            </ul>
            </td>
            <td>
                CSR
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
                CSR
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
                CSR
            </td>
        </tr>
    </tbody>
</table>

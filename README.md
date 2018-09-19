# New relic

This project was made as a technical interview for New Relic

## Instalation Guide

Steps:

1. Clone this project `git clone git@github.com:marduke182/new-relic.git`
2. Install node version specified in file .nvmrc, **be sure that the version is the correct one with `node -v`**

   [Mac Installer](https://github.com/nodejs/node), [Windows Installer](https://github.com/nodejs/node), [Ubuntu, by packet manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

   We recommend using [nvm](https://github.com/creationix/nvm) to easily install multiple versions of node.

3. Install all dependencies

## Development

1. Run: `npm start` to start a server that rebuild at any change
2. Open the browser on: http://localhost:8080

## Implementation

I'am using an AVL to do insertion-deletion it was the most efficient way I found it. I tried a sorted array using binary search to insert the element, but the insertion or deletion increase to O(n) in the worst case (We had to re-arrange all array index), with the binary tree both operation can be done on O(log n). Of course,retrieving 25 first elements in an array is constant O(1), and using binary tree is O(log n).

The initial load is O (N * M) where N is the num of apps and M the num of hostnames. But It's the minimum value possible because we are force to iterate for each app and hosts.

In space I am using O(N * M), we are doing a copy of each app for each hostname in his given AVL tree.

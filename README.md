Splice File Organization Script
===============================

Boy do I love Splice! But boy do I **ABSOLUTELY LOATHE** how the downloaded samples are organized in the file tree!

I whipped up this script to take all my newly downloaded samples and throw them into an `__UNSORTED` folder so I can reorganize my samples exactly how I want to.

## Prerequisites
* Knowledge of where your Splice folder is
* A target "Unsorted" folder where you want your samples copied over to
* Some fresh samples you've acquired and would like to use in your next audio project
* Node.js installed and working on your machine. `v18.2.0` is what this script was created and tested on. Older versions as far back as 14 _should_ work, but no promises!

## Installation

1. Clone this repo
2. Set up your folder structure as the following TODO: Enable dotfile config

⚠️ You must set up your folder structure JUST LIKE THIS for this iteration to work correctly! ⚠️

```
~/
├─ Splice/   <- This is your Splice default download folder
├─ production/
│  ├─ samples/
│  │  ├─ Splice/          <- Your sample library will move here
│  │  │  ├─ __UNSORTED/
```
## Usage and "How it Works"

Run this command to copy all your samples over:
```sh
node scan.js
```

The script will do the following: 
* Scans your `production/samples/Splice` folder to see what samples you already have moved over
* Scans your `~/Splice` folder to see what samples you have from Splice
* Compares the two folders to see if there are any new files
* Moves any new files downloaded from Splice over to the `production/samples/Splice/__UNSORTED` folder.

Here you can listen to each sample in the `__UNSORTED` folder and then manually move the file do your own organization system. **It's important that you keep this new system inside of `production/samples/Splice/`.**

You are free to make any folder inside here however you wish, whatever organization system you like to use is up to you! The script will read from this folder to determine which files to copy over from your Splice library

As an example, here's how I like to set up my sample library:
```
__UNSORTED/
Drums/
├─ Open hats/
├─ Closed hats/
├─ Snares/
├─ Cymbals/
├─ Percussive/
├─ Kicks/
Vocals/
├─ Feminine/
│  ├─ Breathy/
│  ├─ Belting/
│  ├─ Sweet/
├─ Masculine/
│  ├─ Breathy/
│  ├─ Belting/
│  ├─ Sweet/
```
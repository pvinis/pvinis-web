---
title: Crash heaven
date: 2019-10-29T22:41:32.169Z
draft: true
---

## Summary
<!-- Explain the **motivation** for making this change. What existing problem does the pull request solve? -->
I have used RN for a long time, and for all this time, crash reporting has been less great than native development crash reporting. At some point, companies like sentry, bugsnag and a bunch of others started supporting sourcemaps for js crashes in RN, which helped a lot.
But native crashes were (and still are) much harder to diagnose.

..Until now :D

I have make a repo of a sample RN app, included this PR in it, and some code and screenshots to help.
The repo is [here](https://github.com/pvinis/react-native-project-with-crash-heaven-pr).

## Explanation

I was trying to get good crash reports from native crashes in iOS for a looong time. I spoke with people in sentry, in bugsnag and more, and I could not get this solved. There was no clear way to get the **native** crashed to display correctly.
I made two repos here, one for [sentry](https://github.com/pvinis/SentryBadStack) and one for [bugsnag](https://github.com/pvinis/BugsnagBadStack), demonstrating the correct js handling and the bad native handling.

After all this, and talks with their support, twitter etc, I investigated further, on **why** this was happening. I thought there must be some reason that native crashes look bad in all the tools, and in the same way. Maybe it's not their fault, or up to them to fix it, or maybe they didn't have the experience to fix it.

In a test project I created, I checked what's up with the `RCTFatalException`, and I found out that the React Native code is catching the `NSException`s that come from any native modules of a RN app and converting it into an string and sending it to `RCTFatal` that created an `NSError` out of that string. Then it checks if the app has set a fatal error handler and if not, goes ahead and throws that `NSError`.

The problem here is that `NSException` has a bunch more info that the resulting `NSError` is missing or is altering. Turning the callstack into a string renders crash reporting tools useless as they are missing the original place the exception was thrown, symbols, return addresses etc. In both repos above it can be seen that both tools were thinking that the error happened somewhere in the `RCTFatal` function, and it did, since we create it there, losing all the previous useful info of the original exception. That leaves us with just a very long name including a callstack, but very hard to actually map this to the code and dsym.

I added a fatal exception handler, that mirrors the fatal error handler, as the error handler is used around React Native internal code.

Then I stopped making a string out of the original `NSException` and calling `RCTFatal`, and I simply throw the exception. This way no info is lost!

Finally, I added some code examples of native and js crashes and added a part in the `RNTester` app, so people can see how a js and a native error look like while debugging, as well as try to compile the app in release mode and see how the crash report would look like if they connect it to bugsnag or sentry or their tool of choice.

I have attached some images at the bottom of this PR, and you can find some in the 3 repos I linked above.

## Changelog
<!-- Help reviewers and the release process by writing your own changelog entry. See http://facebook.github.io/react-native/docs/contributing#changelog for an example. -->

[iOS] [Fixed] - Changed the way iOS native module exceptions get handled. Instead of making them into an `NSError` and lose the context and callstack, we keep them as `NSException`s and propagate them.
[General] [Added] - Example code for native crashes in iOS and Android, with buttons on RNTester, so developers can see how these look when debugging, as well as the crash reports in release mode.

## Test Plan
<!-- Demonstrate the code is solid. Example: The exact commands you ran and their output, screenshots / videos if the pull request changes UI. -->

You can take the app [here](https://github.com/pvinis/react-native-project-with-crash-heaven-pr) and add your sentry dsn etc, or comment out the sentry line in `App.js` and add bugsnag or instabug or fabric or any other tool you like, and test the result of a native crash. Maybe also compare it with the existing native reports produced by the current RN version.

(I have cancelled any sensitive info that is contained in these repos like api keys etc there, so no worries for that.)

## Appendix
Good js crashes:
![good-js-bugsnag](https://raw.githubusercontent.com/pvinis/BugsnagBadStack/master/crash-js.png)
![good-js-sentry](https://raw.githubusercontent.com/pvinis/SentryBadStack/master/crash-js.png)
Bad native crashes (pre-PR):
![bad-na-bugsnag](https://raw.githubusercontent.com/pvinis/BugsnagBadStack/master/crash-native.png)
![bad-na-sentry](https://raw.githubusercontent.com/pvinis/SentryBadStack/master/crash-native.png)
Good native crash (post-PR):
![good-na-sentry](https://raw.githubusercontent.com/pvinis/react-native-project-with-crash-heaven-pr/master/ios-native.png)

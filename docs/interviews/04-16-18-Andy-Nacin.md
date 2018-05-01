# Developer Interview 

### Andy Nacin, April 16, 2018

---------------------


**Q. What are the Open Source projects that you&#39;ve worked on (both in Government or outside of it)?**

**A.    Outside Gov**
- 5 years was lead engineer on WordPress Open Source Project.
- A number of satalite projects on WordPress
- Contributed to Jquery Foundation projects

  **Inside Gov**
- HTTPS (mandating it within Government)
- He is the maintainer of the USDS website and Digital Services Playbook
- Tangential understanding of USDS open source projects (USWDS, contributed a bit to that one, College Scorecard)
- Open Source Evangelist for the Fed Government (before coming here)
<br>

**Q. How do you find the optimal balance of customization vs. overwhelming choices?**

**A.**
- This is not a design library
- Try to do one way when possible. Read the article: &quot;[Choosing Our Preferences](http://ometer.com/preferences.html).&quot;
  - Consistency is best
  - This will make the tool more usable to developers
- If you can lock down the specific reasons _why_ you need TWO options of a thing, _then_ do it
- We should watch Developers work and see where they mess things up, so that we can make a system that is as fool proof as possible
- We should check with documentation at Stripe or other good UI/UX research companies to make decisions about components when there are differences between agencies
<br>

**Q. Is it better to gather LOTS of business/user requirements up front or tackling sets of requirements one at a time?**

**A.**
- Better to gather a lot of research up front, but don&#39;t gather requirements per se
- BROAD basic research, DEEP specific implementation with one agency
<br>

**Q. How did you promote/market or optimize work to maximize adoption of the thing?**

**A.**
- First you need a MVP thing, but the thing I would focus on the most is the EASIEST THING TO USE for a Developer. They should be able to go from NO KNOWLEDGE to building the thing with very little friction.
- Figure out what your developer personas really look like (do they know Javascript? Do they know React?)
- I&#39;d try to structure these things in a way that encourage smart decision making
- Consider using a side by side of PDF vs Web Form, which makes it easier for a Developer to make decisions
  - E.g. Mailing address (how many lines required)
  - Provide the WHY behind all of the different features
  - If you give the same PDF form to two developers and they should convert to Web Form in a very similar way
<br>

**Q. What&#39;s your recommended strategy for long term maintenance?**

**A.**
- In an ideal world, find Agencies that will be actively using the tool so they can contribute back to the thing
- This should NOT be owned by USDS long term.
<br>

**Q. What were some of the pitfalls in creating the USWDS (US Web Design Standards/System)**

**A.**
- Code implementation was not ideal (should have consulted more engineers in usability testing)
- Simple HTML best practices not used, e.g. bullet lists do not use `<ul><li>` tags
- We should talk to Victor Garcia about this
<br>

**Q. What are your major learnings from leading the WordPress Open Source project?**

**A.** Mostly see below!
<br>

**Q. How do you deal with external custom components?**

**A.** Separate the documentation into Simple &amp; Advanced. We need to figure out what the percentage of simple forms vs. advanced forms there are at large in Government in order to know how much to optimize for external customization.
<br>

**Q. How do you deal with upstream component contributions?**

**A.** 
- We will need to build a contributions page and process of code review.
- &quot;At WordPress, we would routinely turn away good ideas because it was too much to maintain.&quot;
<br>

**Q. What&#39;s the best way to evaluate whether a contribution will be useful?**

**A.** _If_ you have a critical mass of community members following you, comments in the repo are very useful, but if you don&#39;t have critical mass, you could have an Announcements mailing list.

---------------------------------

**Random Insights/ Pearls of Wisdom:**

- Software needs a clear set of goals/objectings/VALUES
- Software needs to be opinionated
- It should be impossible to be able to do dumb things with a forms library
- You want more standardization vs. less
- Each components should do one thing and do it well as opposed to multiple components doing the same thing (overlap)
- In Open Source projects, if you are also utilizing an open source tool as the origin of yours, you should check the licensing of it. Some licenses are **AGPL** , which requires contributions back to the thing itself (in this case, React JSON Schema Form).
&quot;If you use this tool, you have to follow the open source usage and contribution rules that exist in the original tool.&quot;
- **Best practice for OpenSource:** you should use a popular framework tool (e.g. Mozilla), and should attempt to use the most recent version of the tool.

# Developer Interview

### Jordan Casper, April 18, 2018

---------------------


**Q. What are the Open Source projects that you&#39;ve worked on (both in Government or outside of it)?**

**A.   Outside Gov**

- Right before DDS, I was working on open source for 10-15 years.
- Jquery bug fixing was my first stint
- I worked on a JQuery plugin (weather)
- Currently I am a maintaner of mockjax, a AJAX mock tool for APIs. Bloomberg uses it.
  - I was not the creator for this tool. I was using it at the original company that built it, and then I started tweaking it and eventually maintaining it. The company then folded it and transferred the ownership over to me.
  - I spend about 45-60 minutes a week on this project.
  - This one gets about 100 downloads a day

**Inside Gov**

- Open Source is hard to do inside government
- When I first came to DDS, the first big thing I was on was Code.mil. It&#39;s a set of guidelines for opensourcing code at DoD.
- I&#39;m pinged on the Code.mil email list once a week with questions or interest.
- I have now become &quot;The opensource person at DDS.&quot;
- Recently we kicked off AT-AT (an account tracking tool, which is paired with the JEDI Cloud project)
  - This forces contractors to put the open source license on their code before handing off to DoD, though DoD retains rights
- I also help other groups in the DoD create OpenSource projects. We&#39;re getting memos written, section 875 in the NDAA 2018 document (this covers all government agencies). I helped write this. It&#39;s a policy goal of making 20% of all NEW custom developed source code open source in ALL agencies.
- Sharon Woods, DDS&#39;s counsel, gave a talk about this: &quot;The Battle to Free the Code at the Department of Defence.&quot; https://media.libreplanet.org/u/libreplanet/m/the-battle-to-free-the-code-at-the-department-of-defense/

<br>

**Q. What were some of your learnings from working on the Code.mil open source project?**

**A.**

- Mindset is the biggest thing. We need to change government&#39;s mindset that Open Source is insecure and make them understand that it is MORE secure. There are specific examples: the OPM breach. Open Source prevents vulnerabilities from going undiscovered and then patches them extremely quickly.
- ANET is a positive example of how Open Source catches all the vulnerabilities.
- Another mindset shift need is to convince Government that since it&#39;s not allowed to profit off the code, we should just make it available to everyone to use.
- Another challenge is the lack of tech knowledge in agencies – they aren&#39;t able to tell contractors what to make open source.
- We should build relationships with the agencies that HAVE done USDS open source projects and then get the skeptical ones to talk to them.

<br>

**Q. How did you promote/market or optimize work to maximize adoption of the thing?**

**A.**

- Once the tool is in a state where you want people to use it, first market it to USDS teams via their Chiefs of Staff. They will use it, and then the rest of the agency will want to use it via their own staff or contractors.

<br>

**Q. What&#39;s your recommended strategy for long term maintenance of an open source project?**

**A.**

- Create a follow up schedule for the wider developer community
- We should talk to the Code.gov people for the long term (more than 2 years). I&#39;m happy to introduce us to them. I don&#39;t recommend DoD as the long term home for U.S. Forms.
- Maybe ask OAI to maintain Forms.

<br>

**Q. What&#39;s the best way to manage upstream code/component contributions?**

**A.**

- This is tough. Sometimes people don&#39;t contribute! Other times the contributions are just dumb. Because U.S. Forms are Government focused, we probably don&#39;t need to hit up the wider developer community _too_ much, but we could go to Government tech meet ups and demo the tool.
- Code.gov has a Help Wanted section. We should post a call for contributions there.
- We should have VERY clear contribution instructions/guidelines to set expectations.
- When someone submits a PR, they need immediate feedback (triage)

<br>

**Q. What&#39;s the best way to evaluate whether a contribution will be useful?**

**A.**

- In the outside the Government world, the vast majority of the _ideas_ are useful, but it&#39;s the quality of the code that varies a lot.
- Inside Government, a lot of the ideas are politicized, so you have to have a filter to say, &quot;Thank you very much for your comment, but we cannot implement that at this time.&quot; You should always show appreciation to encourage the community to keep contributing.
- You&#39;re going to just get a lot of comments or contributions that you can&#39;t use or aren&#39;t relevant. I just went through 1089 comments/questions on the JEDI RFP.

<br>

**Q. What are 1-2 examples of an open source tool that you found easy or pleasurable to use?**

**A.**

- GitHub is great for contributions.

- &quot;I really like miiine?&quot; Look at Mockjax.
- Node (NoJS) had horrible documentation
- When I&#39;m looking to use an OpenSource tool, I look for 4 things:
  1. The velocity and recent activity on the project (number of commits)
  2. No single point of failure (multiple people contributing)
  3. Clear documentation that show people care about UX/DX (how to use this thing and how to contribute back)
  4. Continuous integration/deployment. Something that shows that you have tests and they are being run. Are there badges on the GitHub repo that show that tests are failing or passing?

<br>

**Q. What is best way to onboard developers to the tool in the documentation?**

**A.**

- People learn in different ways, but any of the following are good:

- A Getting Started guide – numbered steps
- Real examples of usage (example code) (with one line descriptions)
- Examples of edge cases (how to do a weird thing)
- Video demos
- Personally, I like the Getting Started standard: show &quot;Hello World&quot;

<br>

**Q. Are there any specific people (developers) who you think we should consult with?**

**A.** Daniel Hoag, who digitized Form-493 MIRS

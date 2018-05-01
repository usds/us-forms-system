# Developer Interview

### Ben Warfield & Neil Sharma, April 19, 2018

---------------------


## Intro Questions

<br>



**Q. What are the Open Source projects that you&#39;ve worked on (both in Government or outside of it)?**

**A.   Outside Gov**

- **Ben:** I was recently a co-maintainer for GD Graph, as part of Pearl (a server-side graphics generator tool), but the company went out of business (this was 10 years ago). I got bug fixes merged. This was before GitHub.

**Inside Gov**

- **Neil:** this would be my first significant open source task. I have not been a significant contributor. I use open source libraries frequently.


---------------------

## Using the Existing Forms Tool

<br>

**Q. What have you used it for so far?**

**A. (All Neil)**

- I prototyped the N-565 form to prove out the hypothesis that we can build forms faster.
- I spent about a week from when I first looked at the code base (I was designing it while I was coding it)
- It was very successful. Half of my time was figuring out what React JSON Schema Form was. The rest of it was ridiculously easy.
- This was without any documentation except the Readme.md on the Vets.gov Github repo.

<br>

**Q. What was the learning curve for this tool like for you? What did or didn&#39;t seem obvious to you? What was hard to understand or use?**

**A. (All Neil)**

- File Uploads (wasn&#39;t clear how this should work)
- At the time that I was learning JSON Schema, it took me a while to understand Properties and Definitions. Properties &quot;have&quot; definitions. Definitions are optional. But these are important for correctly architecting a large number of forms.
- Intentional example code can mitigate some of this confusion.
- Another confusing property: &#39;title&#39; vs. &#39;uititle&#39;. Where to put?
- Hiding required field within an optional tab (I made a hacky solution). Sometimes a required field within an **optional** conditional set of fields will prevent a user from proceeding even though it&#39;s not truly required.
- Half the problems I had was with misunderstanding JSON Schema.
- Distinguishing how to get a check box vs. a radio button was difficult.
- The documentation of JSON Schema is very general. We could bridge the gap for these specific snafus is to do user testing and collect a series of FAQs.
- This was the first time I used JSON Schema and this would probably be the case for most developers (non direct use).
- Another nitpicky note: there&#39;s a schema definition for &quot;full name&quot;. First and last name was required. Requirements were imposed on these fields. This was good. But in other questions, such as &quot;alternative names,&quot; we didn&#39;t want these to be required.
- Styling: extremely difficult. We need an easy way to put our own styles onto the tool.


---------------------

## Getting to MVP

<br>



**Q.  What&#39;s the most useful way to learn about how a new library works**? (Thorough documentation of every feature? A tutorial that walks you through a specific application of the code? Some combination?)

**A.**

- **Ben:**
  - I look for a tutorial in the documentation. Not to follow step by step but to look at example code.
  - I do think it is good to do step by step tutorials
  - They usually say, &quot;If you have knowledge in this framework or basic setup, skip to here.&quot;
- **Neil:**
  - Researched and narrowed down dozen better react frameworks
  - What made me choose them was the documentation. Not hello world tutorial, but looking for specific tests it can support, which I will actually run.
  - I&#39;ll look at the example code and see if it&#39;s well written and makes sense, then run the tests.
  - I don&#39;t want to have to test 6 frameworks. I want to filter out the bad ones before testing

<br>

**Q.  What are things you look for in determining whether or not to use a particular open source library?** (Number of contributors or installs? Most recent activity? Responsiveness to issues? Good documentation? Easy to get installed and running? Compatibility with existing stack? Others?)

**A.**

- **Ben:**
  - How many downloads does it have?
  - How many contributors does it have?
  - Does it have a web presense?
  - Do people talk about it in the webisphere?
  - I second the example code point Neil made. I like tools that have great example code.
- **Neil:**
  - First impulse: vanity metrics
    - Are there blog posts with a tutorial?
    - I would look at Github and see number of stars, forks, and watchers
    - I am not an early adopter in terms of code
    - NPM graph trend upwards
  - After getting past vanity metrics, documentation example code and community is bigger in terms of making the decision

<br>

**Q. As a user of Open Source tools, what are examples of those you found easy or pleasurable to use?**

**A.**

- **Ben** 
  - &quot;Spring Boot&quot; small java applications tool;
  - A lot depends on context. I am currently operating in a Java world. The classic easy to use things are the Apache commons tools. These are things that probably should be part of the language. &quot;Joda-Time&quot; is an example. It integrates with your existing framework. They are careful to rename if it changes significantly so people can use both versions. But this is good if you already have an application.
- **Neil:**
  - Lightweight Python web based framework: &quot;Flask.&quot; Easier than Django.
  - Python requests library called &quot;Requests: HTTP for Humans.&quot;
  - Javascript is hit or miss, but &quot;Moment.js&quot; is good

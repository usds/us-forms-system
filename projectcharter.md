# U.S. Forms System (Phase I) Project Charter
The federal government maintains around 23,000 forms, which are used to carry out its essential functions and provide critical services and benefits. In the case of paper-only forms, workers spend innumerable hours recreating and quality checking handwritten entries. Where digital forms exist, they are often simply fillable PDFs that still require manual processing because the data isn't collected in a format that can be automatically processed. The need to manually process both of these types of forms leads to more than 11.4 billion hours of paperwork annually.

As we have seen in multiple USDS engagements, web-based forms created through user-centered design methods reduce the respondent burden while producing well-structured data to the agencies for ingestion. Assitionally, by using a common framework for building these forms, teams have seen a significant reduction in the amount of time required to build a form -- going from 5 months down to 5 days, in one example from the Vets.gov team. This project creates a tool for building complex web-based forms significantly faster than existing methods, using best practices in user experience and data collection, validation, and transmission.
  
  
## Stakeholders
The following should be informed about progress and/or major technical decisions.  This list may shift over time as we identify additional agencies to work with in Phase I.

* Sponsor: Suzette Kent (OFCIO)
* OMB Contacts: TBD
  * **TO-DO**: *determine full range of contacts in handover from Bryan Swann ([issue #17](https://github.com/usds/us-forms-system/issues/17))*
* USDS HQ: Matt Cutts, Eddie Hartwig
* VA Digital Service team: Vets.gov product lead (TBD), Vets.gov technical lead (TBD)
* DHS Digital Service team: Ben Warfield, Neil Sharma

## Project Communication Expectations
The team uses the following methods for communication:
* HipChat: "Forms System" channel used for daily communication amongst team members
* GitHub: Code, documentation, issues, and Kanban project board is in the usds/us-forms-system repository.
  * **TO-DO**: *define community, contribution, licensing within GitHub ([issue #18](https://github.com/usds/us-forms-system/issues/18))*
* Email for communication with people outside of the project team
* Bi-Weekly internal meetings (in-person/phone) for project team, currently Mon and Thurs at 9:30am EST
* As-needed/requested in-person/phone meetings with other stakeholders

### Status Reports
This project uses internal and external status reports, as described below.
* **Internal** status reports are used within USDS, and are typically in "what have you done/what are you doing/what are your blockers" format during bi-weekly meetings.  At this time, no other regularly scheduled internal status reports have been requested by USDS Administration.
* **External** status reports are used to report to stakeholders within OMB such as OFCIO.
  * **TO-DO**: *determine preferred format, such as via email, in regular meetings, etc. ([issue #19](https://github.com/usds/us-forms-system/issues/19))*

## Project Team
* [Julie Meloni](https://tools.usds.gov/team/julie-meloni),  Project Lead/Administrative POC
* [Anne Kainic](https://tools.usds.gov/team/anne-kainic),  Engineering Lead
* [Ellen Butters](https://tools.usds.gov/team/ellen-butters), UX Research & Design
* [Ju-Lie McReynolds](https://tools.usds.gov/team/ju-lie-mcreynolds), Product Manager
* [Traci Walker](https://tools.usds.gov/team/traci-walker), Procurement/CO

## Project Goal
The end result of this project will be a practical technical foundation for optimizing the process of building  useful, modern, and frictionless web-based forms.  This goal will be achieved through the creation of an open-source library for building web-based forms using [React](https://reactjs.org/), also incorporating the [U.S. Web Design System](https://designsystem.digital.gov/) and including guidance and best practices for implementation. 

## Scope
The following are **in scope** for this project:
* The aggregation and public sharing of lessons-learned from multiple years of USDS projects involving the transformation of forms from paper to web-based.
* The creation and public open-source release of an open-source library for building web-based forms using [React](https://reactjs.org/), based on the Digital Service @ VA team's extensions to [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form). This library will also incorporate the U.S. Web Design System.
* The creation of exemplars for conversion of high-value paper-based forms to web-based forms using this library, including:
  * one simple form (less than 3 sections of information, no conditionals)
  * one more compliated form (more than 3 sections of information and/or including conditionals)
  * one complex form (more than 3 sections of information, contains conditionals, triggers the use of another form)
* "Submission" of form data produces JSON output
* Documentation for use by a technical audience, as well as guidance for data storage and integration best practices.
* The use of this library in production by at least one agency besides the Department of Veterans Affairs.

The following are **out of scope** for this project:
* Support for GUI form builders, or any method of defining form elements beyond the JSON files currently used by the library.
* Rendering web-based forms using non-React components (e.g. Angular components, Drupal templates)
* Integration with any other digital services, government-based or otherwise (e.g. login.gov for authentication)
* The ability for a user to save a form in progress and return to it at a later time.
* The ability for a user to prefill a form with existing information in their browser profile
* Support for non-linear form progress.

## Milestones
* **TO-DO**: *determine high-level milestones ([issue #22](https://github.com/usds/us-forms-system/issues/22))*

## Dependencies
Successful completion of this project depends on:
* Timely awarding of contract and onboarding of supporting resources.
* Agreement by an agency other than VA to implement a form using this library.

Additionally, we will continue to rely on:
* OMB and USDS Executive support
* USDS resource committments
  * Both Anne Kainic and Ju-Lie McReynolds will remain 1x allocated for phase 1 of this project
  * Ellen Butters will remain available at least 0.5x for phase 1 of this project
  * Julie Meloni will remain available at least 0.2x for phase 1 of this project

## Exit Criteria
We have successfully met our project goal (see project goals and exit plan).  
**or**  
We have partially met our project goal, but some milestones are not met.  
**or**  
We cannot meet our project goal due to external issues.

## Exit plan
*If the project goal is met*  
The team will roll off the project once a working forms library with guidance, best practices, and exemplars is publicly released and in production use by at least one agency other than VA. Additionally, a plan for an additional scope of work for a follow-on project will have been created, which will. a plan for the long-term maintenance of the library.

*If the project goal is partially met*  
If a working forms library is in place with supporting documentation, but examplars are not complete or an agency team has not been able to complete work to implement a form with the library, parts of the team may negotiate staying on to support that work.

*If the project goal cannot be met*  
If, due to internal or external factors, the project goal cannot be met, the team will roll off the project and the team will provide a post-morten report to the Sponsor, Suzette Kent, and any other stakeholders identified by USDS leadership. The post-mortem report will include an explanation of barriers to success and summaries of any work completed, and will provide access to any work in-progress. The post-mortem report will also include recommendations for moving forward, if possible.

## Short Intro
I’ve compiled 19 skills and topics you might find valuable in 2019. Please don’t get overwhelmed — neither I nor most other developers are familiar with every single topic. These are just the exciting things on my radar, and the JavaScript horizon is never-ending.

My name is Yoni Goldberg, an independent Node.JS consultant and the co-author of Node.js best practices. I work with customers at the USA, Europe and Israel on polishing their Node.js applications. Among my services are code, application and architecture review, testing & CI, advanced training sessions, and others which you may find here. Follow me on Twitter

Reviewed & improved by Bruno Scheufler and the Reddit community (special thanks to @pysouth, @fullheap, @ReginaldBull and @relativityboy) and

### 1. Add some types and schemas. Typescript is a great candidate in 2019
Coding in a typeless manner has proven to be counter-productive and error-prone (see research). That doesn’t mean you must go all the way toward strictly-typed syntax, rather choose your desired degree of schematic code either by just validating your entities/models using JSON schema (or Joi), to annotating your vanilla JS with static typing (see Facebook flow) or go all the way to using almost fully-typed syntax using Typescript. The later has gained remarkable momentum in 2018 and seems to find its way into the Node land consensus. If you do plan on using Typescript, ask yourself if your usage should span beyond just Typing features, otherwise using interfaces and abstract classes takes you into a paradigm you never meant to try

Examples:
Explicit models schemas with JSON Schema
Static typing over vanilla JS using Facebook flow
Typed syntax with Typescript

### 2. Enrich your Linters
Linters are a free lunch, with 5 min setup you get for free an auto-pilot guarding your code and catching significant issue as you type. Gone are the days where linting was about cosmetics (no semi-colons!). Nowadays, Linters can catch severe issues like errors that are not thrown correctly and losing information, promises that are never resolved and other sorrows that you never really meant to include in your code

Examples:
eslint-plugin-chai-expect can discover tests without assertions
eslint-plugin-promise can discover promises with no resolve (your code will never continue)
eslint-plugin-security can discover eager regex expressions that might get used for DOS attacks

### 3. Be a bit more Java and a byte less Ruby — deepen your architecture knowledge
Very little architecture and design knowledge are spread around the NodeJS eco-system, everyone speaks about Microservices but only a few about their internal structure. As a result, most applications and examples are MVC concepts and other doubtful patterns from Ruby. What’s wrong with that? MVC, for example, was build for serving content and is an underwhelming technique for structuring a robust backend (Uncle Bob: “MVC is a delivery mechanism, not an application architecture”). Can you really describe your entire business logic, rules, data access, communication with other Microservices in two classes — Controller & Model? See examples below for other design issues and a potential remedy

I absolutely don’t recommend embracing heavy Java/Spring patterns (we came here to Node-Land for a reason, didn’t we? :)), just cherry-pick few ideas that provide great value without sacrificing the app simplicity

Examples:
Did you read my Node.js best practices section 1 — architecture?
Avoid cluttering your business logic with Express objects, read about Domain-Driven Design (see a shortened version of this Novel book here) & Hexagonal architecture
Mixing logic & data-access code in a single class (Active Record pattern — very popular among developers that use Mongoose and Sequelize) easily leads to bloated objects that are harder to test. Consider using the data mapper pattern instead
Skim through the code of this nice Node.js boilerplate that implements Domain Driven Design and clean architecture

### 4. Plan how to utilize Async-Hooks to reach better tracing and context
That single threaded model has one major drawback — requests lose context: as they flow through multiple files and performs asynchronous operations, variables are not preserved throughout their life-cycle. Why is this painful? For example, often developers wish to include within each log entry a unique identifier so later one can correlate all the log entries of the same request — this is not very easy in 2018. 2019 brings new shiny new stuff and async-hooks is one of them (not entirely new but should get out of experimental mode soon )— simply put, it’s a mechanism to inject custom code anytime some async operations are starting and ending. Given this, it’s possible to correlate all the code of the same request and preserve the context. This lays the foundation for many custom packages that takes Node’s tracing and context to the next level

Examples:
cls-hooked allows sharing variables and context through the entire request life-cycle
Jaeger client will visualize the entire request flow through the system, even across Microservices and servers (part of the open-tracing standard and requires a dedicated server to record all the activities)
Learn about async-hooks opportunities and how to code against it. By @guysegev

### 5. Understand the latest ‘Serverless’ features: It’s now ready to battle on the robust infrastructure field (Kubernetes killer?)
Note: The words FaaS and Serverless are used here interchangeably though they are not exactly the same thing. Practically I’m referring to cloud vendors FaaS services like Lambda and Google Functions

Originally FaaS was meant for development micro-tasks and not for robust “Microservice” applications. As their popularity grew, so the appetite of the cloud vendors, soon new features piled-up and suddenly now in 2019 it seems like a worthy infrastructure for robust applications. Can it now compete with Kubernetes and serve large applications? Some see Serverless and Faas as orthogonal technologies but practically every new cloud application in 2019 will have to choose (literally this choice is shown on each cloud vendor UI) one of the three: (1) bare-metal instance like EC2 or GCP compute (2) Kubernetes or (3) FaaS. Consequently, being able to compare K8S vs FaaS/serverless and telling the consequences becomes a mandatory design skill.

p.s. The examples below relate to AWS for convenience only.

Examples:
AWS Lambda SAM tool allows defining and running FaaS locally
AWS Lambda now supports canary deployments!
AWS Lambda layers allow reusing logic among multiple FaaS (simulating the domain/business logic layer of a typical Microservice)

### 6. Meet the latest JavaScript features that are turning green soon
I’m not a big fan of chasing for every new language feature, sometimes these shiny toys work against the code simplicity and clarify. From time to time some really valuable Javascript features are presented (like the introduction of async/await two years ago) so it’s worthwhile watching the TC39 proposal list and node.green to identify attractive new features that fit your coding style

Examples:
Class level field is at stage 3 (last phase) and might turn green in 2019
BigInt is at stage 3 (last phase) and might help when interacting with other microservices, machines or data-warehouse that produce gigantic numbers
Async iterators (Matt Krick) and †promise-finally are already green and worth checking out if you missed one of those

### 7. Become intimately familiar with at least one more API technology. GraphQL is a great candidate in 2019
REST-style API is great for the purpose it was built for: having great control over entities modifications and queries. Have a finance records system? you probably want to design very strict endpoints that a single and explicit data model. REST-style, however, does fall short in other very common use cases like executing similar queries that might return a different set of data, a low-bandwidth network that dictates minimizing the API payload, machine-to-machine communications that emphasize speed, to name of a few. Should you switch? Absolutely not, just mix. APIs are not your architecture, they are just a port (i.e. entry point) to your application and multiple API-styles can easily co-exist. Even on top of a single web framework like Express.

So which one to learn? Your best bet is probably GraphQL which is carried over a great momentum straight into the main-stream. Its echo-system has greatly matured and it serves very popular use cases like dynamic search and hierarchic data source. Grpc, on the other hand, is still a niche technology that fits well server to server communication use cases where minimum overhead is appreciated (e.g. Pub-sub/message-queue system).

Examples:
Learning by contrasting is great — REST vs Graph vs grpc
Skim through a GraphQL, Node & Express tutorial
Watch a short YouTube (11 min) — what is GraphQL?

### 8. Go beyond unit & integration tests — enrich your testing portfolio with shiny new testing techniques
Already familiar with the testing pyramid, unit, integration and end-to-end tests? great, these are the foundation for a successful testing strategy. However, in the past 10 years, the development world had gone through dramatic changes but the testing models were left intact leaving us wondering how to test things like Microservice, rich frontends, and Serverless. Some modern techniques compliment the traditional stacks and sometimes can even replace it to achieve a leaner testing strategy with a better ROI

Examples:

Consumer-driven contracts can prevent breaking API issues between Microservices or between you and the consumer of your API
Snapshot tests can be used not only for UI but also to prevent API regression
Component tests are a balanced approach for Microservice testing
See my YouTube video on “Beyond Unit Tests: 5 Shiny Node.JS Test Types (2018)”

5 shiny testing techniques by Yoni Goldberg

### 9. Align your monitoring with SRE/DevOps best practices
In 2019, even a medium-sized app might constitute dozens of physical moving parts and staying on top of this big band orchestra should be done with a great care. Yet, most developers hadn’t taken their time to learn the monitoring & alerting lessons that site reliability engineers are willing to teach. As an example, often developers prioritize and focus on internal hardware metrics like CPU and memory instead of starting from metrics that directly and undeniably affects the end-user immediately like error rate or latency (“I call this symptom­-based monitoring”, from ‘My philosophy on alerting’). Those customer-facing metrics are sometimes referred to as ‘The golden signals’ and in 2019 you might wanna start there and embrace similar best practices

Read about the 4 monitoring ‘Golden signals’
Read Google Site Reliability Engineering book, or at least the chapter on monitoring
The package request-stats might help to extract those customer-facing metrics so you can share with your monitoring system

### 10. Think like an attacker: increase the security level by learning attack tools and techniques
If you can’t think like an attacker, you can’t think like a defender. In 2019, you shouldn’t outsource the defense work to third-party companies or rely solely on static security scanners: The amount of attack types is overwhelming (The development pipeline and NPM are the latest trends), the pace of application change is untamable — two days after conducting a security workshop the team can add several new AWS services, database types and new IAM role for example… So implicitly developers become the biggest threat and educating them seems like the ultimate remedy. You have to bake security DNA into yourself and your team and add a security touch to everything.

Once you start doing this, it turns out to be not that scary. Just become familiar with common attack types and tools, draw your application architecture and flows and think how you would attack this. With time, unconsciously you’ll start mind security in every design decision and every code line

Examples:
Try OWASP ZAP — a rich assessment & penetration tool that allows even newbies explore the security level of application
Read my list of Node.js Security best practices which contains 23+ attack ideas including JavaScript code examples
Conduct a monthly threats analysis meeting where the team tries to look at the application design and propose attacks. sound boring? not necessarily if you add some gamification and reward members that find an exploit, or run a competition between a blue team that designs a module vs the read team which tries to find exploits

### 11. Have a package update strategy. A lesson learned in 2018: updating too soon is a dangerous practice
Teams usually hold of one of the two npm/Yarn package update strategy: (1) update as soon as possible, sometimes even using an automated process (2) no update strategy at all, sometimes someone updates based on goodwill. While the 1st approach seems superior, surprisingly it turned out to be the riskiest approach in 2018: all the malicious packages incidents like flat-stream were discovered by the community within 40 days, those who waited and didn’t update too soon were saved. Consider formalizing the update strategy using automated tools and find the sweet spot between not updating at all to updating too soon

Examples:
npq by Liran Tal is a great advisory package installer that minds also the release date
Commercial tools like greenkeeper will PR once a package is updated. Unfortunately, none is still capable of suspending the update until a release is proven safe

### 12. Perform gradual installations, separate between the deploy and release phases
In 2019 you might find it useful to perform safer deployments that are not rolled-out in a single shot and leaving your heart beating like a hammer. On the safer side, granular deployment (a.k.a canary) suggests to separate into 3 phases: (1) Deployment — send a new code to an isolated and new production area (e.g. a new Kubernetes service or a new machine instance). At this stage, it serves nobody so no fear attached (2) Test — few people can now work against and test the new code in its most realistic environment, the production (3) Release — gradually allow more users to hit the new version (e.g. the entire east coast) and once you feel enough confident enough you can fade out the older version

A word of caution: performing full-blown canary deployments in 2019 is still very expensive as it requires to orchestrate many infrastructure parts like routing, and monitoring. Therefore, consider starting with simple and semi-manual canary deployments (e.g. manually spin-up more machines with the new version based on the monitoring metrics)

Examples:
Learn more about Canary releases
If you’re willing to go all the way to fancy canary deployments, Spinnaker is a robust deployment platform to look at

### 13. Kubernetes ate the world
An obvious trend, shortened item: Kubernetes (K8S), an infrastructure for application components that seamlessly provide networking, scale-out, deployment and other backbone services, is now almost a de-facto standard for hosting applications. Its popularity is phenomenal: supported by all cloud vendors, has an unmatched echo system of extensions, even 54% of enterprises already have at least one K8S cluster. If you’re a beginner, this link provides a nice hands-on overview. Already did your first K8S steps? make sure to be familiar with Istio, K-Native, Kuberenes jobs, the internals overview, network policies, Helm, Scaffold. Bottom line: Any hour you spent on deepening your K8S skills will pay-off

### 14. Blockchain technologies embody some great opportunities
An obvious trend, shortened item: Not only for Bitcoin and crypto functionality but blockchains can also be used for any distributed system handling transactions.

### 15. Gain solid machine learning skills, or at least speak intelligently about it
An obvious trend, shortened item: Not much to add here, maybe the leading trend of our times. Unfortunately, I’m clueless about machine library and my goal for 2019 is at least becoming comfortable to intelligently speak about it and identify quick-win opportunities (e.g. JS libraries like tensorflow.js and brain.js that can provide some insights without robust infrastructure)

### 16. Skim through the code of selected open source libraries
An obvious trend, shortened item: Beware, working on the same project for a long time using the same set of technologies might narrow your vision and hide great alternatives. Strive to investigate other projects frequently, mostly successful open source projects.

### 17. Deepen your Linux OS understanding, focus on the anatomy of a Linux process
Shortened item: understanding the Linux process will gain you a true competitive advantage as it influences many development tasks like monitoring, guarding processes (e.g. restarting), working with Docker, shutting down gracefully and many others. Strive to understand the life-cycle of a process, signals, the permission model, common commands, types of processes and more. This tutorial covers most of the basics

### 18. Dive deeper into the Node.js internals
I really like Ryan Dahl’s (creator of Node.js v0,1) quote: “You can never understand everything. But, you should push yourself to understand the system”. Gaining a solid understanding of the underlying machine can be proven as valuable when need to handle hairy production issues or designing some infrastructural component (e.g. monitor the event loop performance). You might already be familiar with the core building blocks like v8 and libuv. Isn’t 2019 a great time to deepen your journey within the Node.js rabbit hole and learn, for example, exactly what is happening inside each libuv event loop cycle? or maybe learn how the interaction with the operating system IO is done (E.g. active handles)?

Examples:
Understand what’s happening within each event loop cycle by Deepal Jayasekara
Learn how to pack C/C++ code as NPM module by Konstantin Tarkus
Visit this great in-depth post that covers the entire Node.js internals by Eugene Obrezkov

### 19. Last but not least: learn using scientific methods
What you learn and internalize will shape your future career. Nevertheless, many developers neither have a learning strategy nor do they learn how to learn effectively using scientific methods. Consider a meeting about “Preventing JavaScript type bugs”, the VP asks to keep using vanilla JavaScript without refactoring the entire codebase, (no Typescript…), suddenly your colleague suggests using Facebook flow, everybody in the room likes it! You suddenly remember that you read about it once but it was never internalized and just slipped through your mind. How come? apparently, there is phenomena named ‘illusion of competness’ which explains why we forget things: You may spend precious 1 hour on reading a blog post but you’re fooling yourself and won’t remember a thing within a few days! Studies showed that if you try to speak about it later with someone or just read again a summary the next day you can greatly improve the chances of memorizing this concept. There are various other techniques that will help you remember and pull the right piece of knowledge at the right time (see examples below), spending a few hours on learning how to learn can make a great deal for your career in 2019!

Examples:
Take the amazing course ‘Learning How to Learn’
Use chunking and categorization while learning
Reading about some new technology? Compare it to existing things you’re familiar with, speak about it with your teammates, ask yourself the “so what” question — why is it needed, draw a diagram, re-read a summary and help your brain internalize and categorize it so you’ll be able to fetch it in the important situation!
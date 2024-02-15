const enneagramTypeMapping = {
 1: "Type 1 - The Reformer",
 2: "Type 2 - The Helper",
 3: "Type 3 - The Achiever",
 4: "Type 4 - The Individualist",
 5: "Type 5 - The Investigator",
 6: "Type 6 - The Loyalist",
 7: "Type 7 - The Enthusiast",
 8: "Type 8 - The Challenger",
 9: "Type 9 - The Peacemaker",
};

const quizQuestions = [ 
  // Type 1 Questions
  { text: "I prioritize integrity and fairness over being flexible or compassionate.", type: 1 },
  { text: "I find it challenging to see things in shades of grey, preferring a clear distinction between right and wrong.", type: 1 },
  { text: "Correctness, fairness, and self-discipline drive me more than compassion or tolerance.", type: 1 },
  { text: "Being logical often comes easier to me than being emotional.", type: 1 },
  { text: "I tend to be critical of myself and others, aiming for improvement.", type: 1 },
  { text: "Rules and regulations are important to me, and I get frustrated when others do not follow them.", type: 1 },
  { text: "I view being a perfectionist as a strength, ensuring all details are correct.", type: 1 },
  { text: "Admitting when I'm wrong is difficult for me.", type: 1 },
  { text: "I fear being judged by others as improper or incorrect.", type: 1 },
  { text: "My motivation is driven by the need to be correct, fair, and disciplined.", type: 1 },

  
  // Type 2 Questions
  { text: "I often put others' needs and desires above my own.", type: 2 },
  { text: "Feeling appreciated and needed by others is deeply important to me.", type: 2 },
  { text: "I go out of my way to help and support others, sometimes at the expense of my own needs.", type: 2 },
  { text: "Building strong, supportive relationships is a key focus in my life.", type: 2 },
  { text: "I find it challenging to ask for help, preferring to be the one who provides support.", type: 2 },
  { text: "Acknowledgement and gratitude from others make me feel valued and loved.", type: 2 },
  { text: "I am highly empathetic and sensitive to the feelings of those around me.", type: 2 },
  { text: "Neglecting my own needs in favor of helping others is a common pattern for me.", type: 2 },
  { text: "I strive to make myself indispensable in my relationships and workplace.", type: 2 },
  { text: "My mood and self-esteem are significantly influenced by how much others need and appreciate me.", type: 2 },

  
  
  // Type 3 Questions
  { text: "I strive to be recognized as successful and competent in my activities.", type: 3 },
  { text: "Making a strong positive impression on others is important to me.", type: 3 },
  { text: "I am motivated by goals and work hard to achieve them, often multitasking.", type: 3 },
  { text: "I value efficiency and productivity, and I aim to be the best at what I do.", type: 3 },
  { text: "I prefer leading to following and tend to be competitive.", type: 3 },
  { text: "I adapt my approach to connect well with different people.", type: 3 },
  { text: "Acknowledgement for my achievements is crucial to my sense of satisfaction.", type: 3 },
  { text: "I often take work on vacations and find it hard to completely relax.", type: 3 },
  { text: "Accessing and expressing my emotions can be challenging for me.", type: 3 },
  { text: "I focus on personal success and recognition for my accomplishments.", type: 3 },

  
  // Type 4 Questions
  { text: "I see beauty and significance in aspects of life others may overlook.", type: 4 },
  { text: "I often feel different from others, as if I don't truly belong anywhere.", type: 4 },
  { text: "My emotions run deeper than most, and I experience a wide range of feelings.", type: 4 },
  { text: "Sensitivity is a trait I embody, making me acutely aware of my environment.", type: 4 },
  { text: "A sense of something missing in life frequently occupies my thoughts.", type: 4 },
  { text: "I find myself envious of others' successes and relationships at times.", type: 4 },
  { text: "Expressing myself creatively is not just an outlet; it's a necessity for me.", type: 4 },
  { text: "Feeling misunderstood, I can become withdrawn or assert my uniqueness more strongly.", type: 4 },
  { text: "Romance and the quest for an ideal love significantly color my worldview.", type: 4 },
  { text: "I am drawn to the unique and esoteric, finding commonality in the uncommon.", type: 4 },
  
  // Type 5 Questions
  { text: "I prefer analyzing and understanding things over engaging in social activities.", type: 5 },
  { text: "I value my privacy and tend to keep my thoughts and feelings to myself.", type: 5 },
  { text: "I'm more comfortable with ideas and information than with expressing emotions.", type: 5 },
  { text: "Spending time alone to pursue my interests is essential for me.", type: 5 },
  { text: "I tend to observe rather than participate in group activities.", type: 5 },
  { text: "Critical thinking and logic are my preferred tools for making decisions.", type: 5 },
  { text: "I might come off as detached or aloof, especially in emotionally charged situations.", type: 5 },
  { text: "Learning and accumulating knowledge energize me more than social interactions.", type: 5 },
  { text: "I can be very independent and self-sufficient, often preferring to rely on myself.", type: 5 },
  { text: "Sharing personal information or feelings with others doesn't come easily to me.", type: 5 },
  
  // Type 6 Questions
  { text: "I often anticipate and plan for potential challenges or obstacles.", type: 6 },
  { text: "I sometimes question the motives of people in positions of authority.", type: 6 },
  { text: "Loyalty and reliability are qualities I deeply value and strive to embody.", type: 6 },
  { text: "I experience more anxiety than most people I know.", type: 6 },
  { text: "In times of crisis, I act swiftly, but I may become overwhelmed once the situation stabilizes.", type: 6 },
  { text: "Even when things are going well, I sometimes worry about what could go wrong.", type: 6 },
  { text: "Making decisions can be difficult for me due to doubts and second-guessing.", type: 6 },
  { text: "I prefer predictable situations and may struggle with uncertainty.", type: 6 },
  { text: "I often find it hard to stop worrying about things that concern me.", type: 6 },
  { text: "I value having a supportive community and feel most comfortable with like-minded people.", type: 6 },
  
  // Type 7 Questions
  { text: "I'm always ready for new and exciting experiences.", type: 7 },
  { text: "Optimism is my default, and I see the glass as half full.", type: 7 },
  { text: "I prefer to keep my options open and commit to things lightly.", type: 7 },
  { text: "The fear of missing out (FOMO) often drives my decisions.", type: 7 },
  { text: "Looking forward to future possibilities is what excites me the most.", type: 7 },
  { text: "I find myself jumping from one interest to another, seeking variety and novelty.", type: 7 },
  { text: "I often avoid deep or heavy conversations, favoring light-heartedness.", type: 7 },
  { text: "I have a knack for finding the silver lining in every situation.", type: 7 },
  { text: "Finishing projects can be challenging for me, especially as I near completion and new ideas catch my attention.", type: 7 },
  { text: "Routine and monotony are my adversaries; I thrive on change and excitement.", type: 7 },
  
  // Type 8 Questions
  { text: "I'm known for my directness and willingness to confront challenges head-on.", type: 8 },
  { text: "I value honesty and justice, often taking a stand for what I believe is right.", type: 8 },
  { text: "Leadership comes naturally to me, and I often find myself in roles where I can make decisions.", type: 8 },
  { text: "I'm protective of those close to me and can be fiercely loyal.", type: 8 },
  { text: "I prefer to face problems directly rather than avoid them.", type: 8 },
  { text: "My approach to life is assertive and confident, sometimes seen as intimidating by others.", type: 8 },
  { text: "I have a strong need for independence and resist showing vulnerability.", type: 8 },
  { text: "Challenges energize me, and I'm not afraid to go against the grain.", type: 8 },
  { text: "I respect people who stand up for themselves and can be quite persuasive in getting what I want.", type: 8 },
  { text: "My protective nature extends to social causes or individuals who I perceive as underdogs.", type: 8 },
  
  // Type 9 Questions
  { text: "Avoiding conflict and seeking peace are top priorities for me.", type: 9 },
  { text: "I tend to procrastinate and focus on less important tasks to avoid stress.", type: 9 },
  { text: "I prefer to go along with others' plans rather than assert my own desires.", type: 9 },
  { text: "I find comfort in routines and can become unsettled by unexpected changes.", type: 9 },
  { text: "Others describe me as calm and peaceful, even if I don't always feel that way internally.", type: 9 },
  { text: "Making decisions can be difficult for me, especially when faced with multiple options.", type: 9 },
  { text: "I value harmony in my relationships and work to avoid discord.", type: 9 },
  { text: "I can be seen as a good listener, though I sometimes find it hard to stay fully engaged in long conversations.", type: 9 },
  { text: "I enjoy spending time in nature and find it rejuvenating.", type: 9 },
  { text: "I might resist others' demands passively, preferring to maintain my inner peace.", type: 9 }

];



export { enneagramTypeMapping, quizQuestions};

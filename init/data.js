const sampleStudyUnits=[
  {
    "sub_name": "Physics",
    "description": "Fundamental physics concepts for high school.",
    "topics": [
      {
        "title": "Laws of Motion part 2",
        "notes": "Newton's three laws of motion explain how objects behave when forces are applied to them. \n\n1. **First Law (Law of Inertia):** An object will remain at rest or in uniform motion unless acted upon by an external force. This explains why seatbelts are necessary in moving vehicles.\n\n2. **Second Law:** The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass (F = ma). This law forms the basis for calculating force in physical systems.\n\n3. **Third Law:** For every action, there is an equal and opposite reaction. It describes the mutual interactions between two objects. For example, when you push against a wall, the wall pushes back with equal force.",
        "videos": [
            "https://youtu.be/g550H4e5FCY?si=j4BLcMK1rkJ0aLkJ"
        ],
        "resources": [
          {
            "type": "pdf",
            "url": "https://example.com/notes/laws-of-motion.pdf"
          },
        ]
      },
      {
        "title": "Work, Energy, and Power",
        "notes": "Work is said to be done when a force is applied on an object and the object moves in the direction of the force. The amount of work done is calculated using the formula: Work = Force × Displacement × cos(θ), where θ is the angle between force and displacement.\n\nEnergy is the ability or capacity to do work. It exists in various forms such as kinetic energy, potential energy, thermal energy, etc. The SI unit of energy is the joule (J).\n\nPower is the rate of doing work or transferring energy. It is calculated as Power = Work/Time and measured in watts (W). One watt is equivalent to one joule per second.",
        "videos": [
          "https://youtu.be/65Ytcr-KweQ?si=1QNgrKOH1WpKJvQR"
        ],
        "resources": []
      }
    ]
  },
  {
    "sub_name": "English",
    "description": "Grammar, comprehension, and vocabulary essentials.",
    "topics": [
      {
        "title": "Tenses",
        "notes": "Tenses are used to express the time of action. There are three primary tenses: Present, Past, and Future. Each of these is divided into four aspects:\n\n1. **Simple:** Expresses general facts or habits.\n2. **Continuous:** Describes ongoing actions.\n3. **Perfect:** Refers to completed actions.\n4. **Perfect Continuous:** Refers to actions that were ongoing and are still continuing or just finished.\n\nExample (Present Tense):\n- Simple: I eat.\n- Continuous: I am eating.\n- Perfect: I have eaten.\n- Perfect Continuous: I have been eating.",
        "videos": [
          "https://www.youtube.com/watch?v=wWlz0uubkEg"
        ],
        "resources": [
          {
            "type": "pdf",
            "url": "https://example.com/notes/english-tenses.pdf"
          }
        ]
      },
      {
        "title": "Active and Passive Voice",
        "notes": "In English grammar, voice indicates the relationship between the subject and the action. There are two types:\n\n1. **Active Voice:** The subject performs the action. Example: *She wrote a letter.*\n2. **Passive Voice:** The subject receives the action. Example: *A letter was written by her.*\n\nPassive voice is often used to emphasize the action or when the doer is unknown. Example: *The door was left open.* This structure is commonly used in scientific writing and formal communication.",
        "videos": [],
        "resources": []
      }
    ]
  },
  {
    "sub_name": "Mathematics",
    "description": "Algebra, geometry, and more for Class 10 level.",
    "topics": [
      {
        "title": "Quadratic Equations",
        "notes": "A quadratic equation is a second-degree polynomial equation in the form ax² + bx + c = 0, where a ≠ 0. It has at most two solutions, known as the roots of the equation. These roots can be real or complex depending on the discriminant (b² - 4ac).\n\n**Methods to solve quadratic equations:**\n1. **Factorization:** Splitting the middle term to find two binomial factors.\n2. **Completing the square:** Rearranging the equation to form a perfect square trinomial.\n3. **Quadratic formula:** x = [-b ± √(b² - 4ac)] / (2a).\n\nQuadratic equations are widely used in physics, engineering, finance, and more. Graphically, they represent a parabola on the coordinate plane.",
        "videos": [
          "https://www.youtube.com/live/t8fUmrKnvEM?si=gRJOTz7Jsp8f1RDG"
        ],
        "resources": [
          {
            "type": "pdf",
            "url": "https://example.com/notes/quadratic-equations.pdf"
          }
        ]
      }
    ]
  }
]

module.exports = {data: sampleStudyUnits};

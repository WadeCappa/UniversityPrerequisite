# Core Functionality:
	User flow
		User starts on welcome screen (non-critical)
		User enters university screen with search
		User finds university, user enters major screen.
		User selects a major. 
		User is taken to schedule builder screen.
			The university and organization follow the user to the schedule builder page
		
	Schedule builder 
		User can mark tasks as done. They become static and green.
		User can add a course. If its prerequisites are not met it becomes red.
			On hover required prerequisites are highlighted in yellow and numbered based on path. 
		Users can add more objectives 
			Objectives are listed to users (figure out where to do this and how to make it look good)
		User can save a schedule 

	User accounts
		Users can sign in 
		Users can share their schedules 
		Users can like schedules


1) Do user authentication starting with user support for accounts in the backend. This requires a lot of research, so figure out what you're going to do (draw diagrams) and then do it
2) Allow users to save and load schedules. 
3) Allow users to search schedules
4) Improve Schedule making
    1) Multiple degrees (objectives)
    2) Encode things like u-core as objectives
    3) Display a list of degrees and show requirements that the user has not fullfilled
    4) Visually show the user the paths they have as options some how
5) Allow users to add content 
    1) Users can add new universities (no name collisions) 
    2) Allow users to modify universities 
    3) Allow users to add objectives and modify objectives
    4) Allow users to add tasks and modify tasks

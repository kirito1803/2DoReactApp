const messageType = {
    add_1: {
        icon: "fa-solid fa-face-laugh-beam",
        title: "Good luck",
        message: "You've just add a deadline"
    },

    add_2: {
        icon: "fa-solid fa-stopwatch-20",
        title: "Fighting",
        message: "Just another one, you can do it !!"
    },

    add_3: {
        icon: "fa-solid fa-face-grin-stars",
        title: "Wow, a new deadline",
        message: "Go get it, tiger !!"
    },

    delete_finished_1: {
        icon: "fa-solid fa-face-grin-squint",
        title: "Delete success",
        message: "Ready for the next deadline"
    },

    delete_finished_2: {
        icon: "fa-solid fa-face-laugh-wink",
        title: "Ready for a new one",
        message: "Bring me another challenge !!"
    },

    delete_pending_1: {
        icon: "fa-solid fa-face-grin-beam-sweat",
        title: "You don't need it anymore",
        message: "Have a rest and ready for a new one"
    },

    delete_pending_2: {
        icon: "fa-solid fa-face-grin-squint-tears",
        title: "Have a rest",
        message: "Take a good relax will help you"
    },

    delete_missed_1: {
        icon: "fa-solid fa-face-sad-cry",
        title: "Too Bad",
        message: "Just another effort and you can do it"
    },

    delete_missed_2: {
        icon: "fa-solid fa-face-frown",
        title: "Better luck next time",
        message: "Don't give up, I know you can do it"
    },

    finished_1: {
        icon: "fa-solid fa-face-kiss-wink-heart",
        title: "Congratulation",
        message: "You've just finishing a deadline"
    },

    finished_2: {
        icon: "fa-solid fa-face-grin-hearts",
        title: "Excellent",
        message: "This is too easy, right :))"
    },

    finished_3: {
        icon: "fa-solid fa-face-laugh-beam",
        title: "Piece of cake",
        message: "Follow excellent, success'll chase you"
    },

    marked: {
        icon: "fa-solid fa-bolt",
        title: "Seem like it's important",
        message: "Remember, don't forget to do it"
    }
}

export default messageType

/* 
    status of task
    - time-on: true
        + un-clicked: false (.pending)
            -> no-line + check emoji + clickable
        + clicked: true (.finished)
            -> green line-through + happy emoji + un-clickable
    - time-out: false -> un-clickable 
        + un-clicked: (.missed)
            -> red line-through + sad emoji + un-clickable

    * {
        click: moment
        deadline
    }
*/
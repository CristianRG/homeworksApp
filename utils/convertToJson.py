def convertToJsonHomework(ObjectsTuple):
    if ObjectsTuple:
        homeworks = [
    
        ]
        
        for homework, userHomework in ObjectsTuple:
            homeworks.append({'id':homework.id_homework, 'subject':homework.subject, 'title':homework.title, 'description': homework.description,
                            'status': homework.status, 'drafting_date': userHomework.drafting_date, 'deadline': userHomework.deadline})
        
    return homeworks

def convertToJsonUsers(ObjectsTuple):
    if ObjectsTuple:
        usersList = []
        
        for user in ObjectsTuple:
            usersList.append(user.username)
            
    return usersList
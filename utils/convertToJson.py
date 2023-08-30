def convertToJsonHomework(ObjectsTuple):
    if ObjectsTuple:
        homeworks = [
    
        ]
        
        for homework in ObjectsTuple:
            homeworks.append({'id':homework.id_homework, 'title':homework.title, 'description': homework.description,
                            'status': homework.status, 'drafting_date': homework.drafting_date, 'deadline': homework.deadline})
        
        if (len(homeworks) > 0):
            return homeworks
        
    return []
        

def convertToJsonUsers(ObjectsTuple):
    if ObjectsTuple:
        usersList = []
        
        for user in ObjectsTuple:
            usersList.append(user.username)
            
        if (len(usersList) > 0):
            return usersList
        
    return []
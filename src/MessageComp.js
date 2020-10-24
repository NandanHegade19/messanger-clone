import React, {forwardRef} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//forward ref is hoc, gives 'ref' to do smooth animations.
const MessageComp = forwardRef(({usernameProp, allMessagesObj}, ref) => {
    console.log(allMessagesObj);
    const isUser = usernameProp === allMessagesObj.username; //to identify if I am the sender
    
    return (
            <div ref = {ref} className = {`message-card ${isUser && 'message-isUser'}`}> {/**Helps to align left/right  */}
                <Card className = {isUser ? "message-card-user" : "message-card-guest"}>
                    <CardContent>
                        <Typography>
                            {!isUser && `${allMessagesObj.username || 'Unknown User'}:`} {allMessagesObj.message}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            
        
    )
})

export default MessageComp

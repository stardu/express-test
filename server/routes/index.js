import login from './login'
import register from './register'
import form from './form'
import message from './message'

export default app => {
    app.use('/api/login', login);
    app.use('/api/register', register);
    app.use('/api/message', message);
    app.use("/api/form", form);
}
import auth from '../../../data/auth';

// Se sei loggato puoi passare, altrimenti login
export default (to, from, next) => {
    const user = auth.getters.getUser;

    if (user) next();
    else next({ name: 'login' });
}
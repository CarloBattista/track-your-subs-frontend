import auth from '../../../data/auth';

// Se sei loggato, non puoi vederla, vai alla home
export default (to, from, next) => {
    const user = auth.getters.getUser;

    if (user) next({ name: 'home' });
    else next();
}
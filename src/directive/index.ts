import clipboard from './clipboard'
const directives: any = {
  clipboard
}

const registerDirective = (app: any) => {
  Object.keys( directives ).forEach( key => {
    app.directive( key, directives[key] )
  } )
}
export default registerDirective

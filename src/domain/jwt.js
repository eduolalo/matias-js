/**
 * @fileoverview JWT es la clase que contiene todos los métodos necesarios para
 * generar los JWTs para la comunicación con Gee
 */
export class JWT {
  /**
   * @param {string} privCert: el certificado provado con el que se generará el JWT
   */
  constructor({ privCert }) {
    this.privCert = privCert;
  }

    /**
     * GenerateJWT es la función que genera el JWT para comunicarse con el servicio de Gee
     * @param {string} privCert: el certificado provado con el que se generará el JWT
     * @param {object} payload: el payload que se enviará en el JWT
     * @returns {string} token: el JWT generado
     */
    async generateJWT(payload) {
        const token = jwt.sign(payload, this.privCert, {
        algorithm: "RS256"
        });
        return token;
    }
    /**
     * DepostisJWT recibe el ID del depósito que se desea consultar y devuelve el JWT
     * necesario para el endopoint de Gee "/depositos/{id}/"
     */
    async depositJWT(depositId) {
        const payload = {
        sub: `/deposit/${depositId}`,
        iss: process.env.GEE_CLIID,
        scp: "GET",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        };
        const token = await this.generateJWT(payload);
        return token;
    }
}
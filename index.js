"use strict";

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require("lodash");
const AWS = require("aws-sdk");

module.exports = {
	init(config) {
		const S3 = new AWS.S3({
			apiVersion: "2006-03-01",
			...config,
		});

		return {
			upload(file, customParams = {}) {
				return new Promise((resolve, reject) => {
					// upload file on S3 bucket
					const path = file.path ? `${file.path}/` : "";
					S3.upload(
						{
							Key: `${path}${file.hash}${file.ext}`,
							Body: Buffer.from(file.buffer, "binary"),
							ACL: "public-read",
							ContentType: file.mime,
							...customParams,
						},
						(err, data) => {
							if (err) {
								return reject(err);
							}

							if (config.cdn) {
                                if(config.path){
                                    file.url = `${config.cdn}${data.Key}`.replace(config.path, "");
                                }else{
                                    file.url = `${config.cdn}${data.Key}`;

                                }
							} else {
								file.url = data.Location;
							}
							resolve();
						}
					);
				});
			},
			delete(file, customParams = {}) {
				return new Promise((resolve, reject) => {
					// delete file on S3 bucket
					const path = config.path ? `${config.path}/` : "";
					S3.deleteObject(
						{
							Key: `${path}${file.hash}${file.ext}`,
							Bucket:	config.params.Bucket,
						},
						(err, data) => {
							if (err) {
								return reject(err);
							}

							resolve();
						}
					);
				});
			},
		};
	},
};

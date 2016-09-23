;(function () {
  'use strict'
  angular.module('app', [])
    .controller('UploadController', UploadController)
    .directive('wistiaUpload', WistiaUpload)

  function UploadController ($scope, $http, $sce) {
    var controller = this

    controller.started = false

    controller.startUpload = function () {
      controller.started = true
      $('#fileupload').fileupload({
        url: 'https://upload.wistia.com/',
        dataType: 'json',
        done: function (e, data) {
          controller.videoId = data.result.hashed_id
          controller.videoUrl = '//fast.wistia.com/embed/medias/' + controller.videoId + '.jsonp'
          $sce.trustAsUrl(controller.videoUrl)
          controller.videoName = data.result.name
          controller.started = false
          controller.videoDone = true
          $scope.$apply()
        },
        progressall: function (e, data) {
          controller.progress = parseInt(data.loaded / data.total * 100, 10)
          $('.progress-bar').css('width', controller.progress + '%')
        },
        formData: {api_password: '392f8c278859df78c52b19da0f82910e112c02a865eeccb85461bef8b83e3a7d'}
      })
    }
  }

  function WistiaUpload () {
    return {
      restrict: 'E',
      templateUrl: 'wistia-upload.html',
      controller: 'UploadController',
      controllerAs: 'uploadCtrl'
    }
  }
})()
